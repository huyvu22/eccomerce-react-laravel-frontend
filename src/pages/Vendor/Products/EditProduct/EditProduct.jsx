import React, {useEffect, useState} from 'react';
import './EditProduct.scss';
import {toast} from "react-toastify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw, convertFromHTML, ContentState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {useParams} from "react-router-dom";
import {asset} from "../../../../services/Helpers/Image/image";
import useClient from "../../../../services/Hooks/useClient";
import {getCookie} from "../../../../utils/dataHandler";
import config from "../../../../configs/Config.json";

const EditProduct = () => {
    const sellerToken = getCookie('seller_access_token');
    const client = useClient();
    const {id, slug} = useParams();
    const {SERVER_API} = config;
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [fullDescription, setFullDescription] = useState('');
    const [data, setData] = useState({
        name: '',
        image: '',
        category: '',
        sub_category: '',
        sku: '',
        price: '',
        offer_price: '',
        stock_quantity: '',
        short_description: '',
        full_description: '',
        product_type: '',
        status: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const getProduct = async () => {

        const res = await client.get(`seller/products/${id}/edit`, '', sellerToken)
        if (res.response.ok) {
            const dataObj = await res.data.data;
            setProduct(dataObj);
            setFullDescription(dataObj.full_description);
            setSubcategories(dataObj.category.subCategories);

            setData({
                name: dataObj.name,
                image: dataObj.image,
                category: dataObj.category.id,
                sub_category: dataObj.subCategory.id,
                sku: dataObj.sku,
                price: dataObj.price,
                offer_price: dataObj.offer_price,
                stock_quantity: dataObj.availability,
                short_description: dataObj.short_description,
                full_description: dataObj.full_description,
                product_type: dataObj.product_type,
                status: dataObj.status,
            })
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    const getCategory = async () => {
        const res = await client.get('category');
        if (res.response.ok) {
            const categoryArr = await res.data.data;
            setCategories(categoryArr);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleCategoryChange = (event) => {
        setData({...data, [event.target.name]: event.target.value});
        const selectedCategoryId = event.target.value;

        const selectedCategoryData = categories.find(item => item.category.id === +selectedCategoryId);
        if (selectedCategoryData) {
            setSubcategories(selectedCategoryData.subCategory);
        } else {
            setSubcategories([]);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...data,
            full_description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            image: selectedImage
        };

        const formData = new FormData();
        formData.append("name", updatedData.name);
        formData.append("image", updatedData.image);
        formData.append("category", updatedData.category);
        formData.append("sub_category", updatedData.sub_category);
        formData.append("sku", updatedData.sku);
        formData.append("price", updatedData.price);
        formData.append("offer_price", updatedData.offer_price);
        formData.append("stock_quantity", updatedData.stock_quantity);
        formData.append("short_description", updatedData.short_description);
        formData.append("full_description", updatedData.full_description);
        formData.append("product_type", updatedData.product_type);
        formData.append("status", updatedData.status);
        formData.append("product_id", product.id);

        let res = await fetch(`${SERVER_API}seller/products`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${sellerToken}`,
            },
            body: formData,
        })

        const response = await res.json();
        if (res.ok) {
            toast(response.message);
        } else {
            toast(response.message);
        }

    };

    useEffect(() => {
        if (fullDescription) {
            const contentBlocks = convertFromHTML(fullDescription);
            const contentState = ContentState.createFromBlockArray(contentBlocks);
            const initialEditorState = EditorState.createWithContent(contentState);
            setEditorState(initialEditorState);
        }
    }, [fullDescription]);


    return (
        <section>
            <div className="edit-product">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-xl-12">
                            <div className="product-detail">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Name:<span className="required_red">*</span></label>
                                            <input className="form-control" defaultValue={product?.name} type="text" id="name" name="name" onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="category">Category:<span className="required_red">*</span></label>
                                            <select className="form-select" id="category" name="category" onChange={handleCategoryChange}>
                                                <option value="0">-SELECT-</option>
                                                {
                                                    categories.length &&
                                                    categories.map(({category, subCategory}) => (
                                                        <option value={category.id} key={category.id} selected={product?.category?.name === category?.name}>{category.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="sub_category">Subcategory:<span className="required_red">*</span></label>
                                            <select className="form-select" id="sub_category" name="sub_category" onChange={handleChange}>
                                                <option value="0">-SELECT-</option>
                                                {
                                                    subcategories?.length &&
                                                    subcategories.map(({id, name}) => (
                                                        <option value={id} key={id} selected={product?.subCategory.name === name}>{name}</option>
                                                    ))
                                                }

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Weight:</label>
                                            <input className="form-control" id="weight" name="weight" onChange={handleChange}/>
                                            <span className="small_red">e.g. 1 KG.</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Stock:<span className="required_red">*</span></label>
                                            <input className="form-control" id="stock" name="stock_quantity" defaultValue={product.availability} onChange={handleChange}/>
                                            <span className="small_red">Number only</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>SKU:<span className="required_red">*</span></label>
                                            <input className="form-control" id="sku" name="sku" defaultValue={product.sku} onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Original price:<span className="required_red">*</span></label>
                                            <input className="form-control" id="price" name="price" defaultValue={product.price} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Price after discount:</label>
                                            <input className="form-control" id="offer_price" name="offer_price" defaultValue={product.offer_price} onChange={handleChange}/>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="description">Short Description:<span className="required_red">*</span></label>
                                        <textarea
                                            id="short_description"
                                            name="short_description"
                                            className="form-control"
                                            rows="3"
                                            onChange={handleChange}
                                            defaultValue={product?.short_description} // Set the value
                                        ></textarea>
                                        <span className="small_red" id="short_description_limit">200 characters remaining.</span>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="description">Description:<span className="required_red">*</span></label>
                                        <Editor
                                            editorState={editorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            onEditorStateChange={onEditorStateChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Photos:</label>
                                            <input className="form-control" type="file" multiple="" id="photos" defaultValue={product.thumb_image} name="image"
                                                   onChange={handleImageChange}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Preview:</label>
                                            <br/>
                                            <img src={asset(product.thumb_image)} style={{width: "200px"}} alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Posting Type:</label>
                                            <select className="form-select" id="product_type" name="product_type" onChange={handleChange}>
                                                <option value="">-SELECT-</option>
                                                <option value="best_product" selected={product.product_type === 'sale'}>BestDeal</option>
                                                <option value="featured" selected={product.product_type === 'featured'}>Featured</option>
                                                <option value="new_arrival" selected={product.product_type === 'new'}>New Arrival</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Status:</label>
                                            <select className="form-select" id="status" name="status" onChange={handleChange}>
                                                <option value="1" selected={product.status === 1}>Active</option>
                                                <option value="0" selected={product.status === 0}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <button className="form-btn" onClick={handleSubmit}>Save Post</button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditProduct;