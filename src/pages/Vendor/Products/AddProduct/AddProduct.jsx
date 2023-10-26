import React, {useEffect, useState} from 'react';
import './AddProduct.scss';
import {toast} from "react-toastify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {getCookie} from "../../../../utils/dataHandler";
import useClient from "../../../../services/Hooks/useClient";
import config from "../../../../configs/Config.json";
import {useNavigate} from "react-router-dom";

const AddProduct = () => {
    const client = useClient();
    const navigate = useNavigate();
    const {SERVER_API} = config;
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
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
        status: '1',
    });
    const [selectedImage, setSelectedImage] = useState(null);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const getCategory = async () => {
        const res = await client.get('category');
        if (res.response.ok) {
            const dataObj = await res.data;
            let categoryArr = dataObj.data;
            setCategories(categoryArr);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);


    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
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
        const sellerToken = getCookie('seller_access_token')
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

        let res = await fetch(`${SERVER_API}seller/products`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${sellerToken}`
            },
            body: formData,
        })
        const response = await res.json();
        if (res.ok) {
            toast(response.message);
            navigate('/item/my-products')
        } else {
            toast(response.message);
        }
    };


    return (
        <section>
            <div className="add-product">

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-xl-12">
                            <div className="product-detail">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Name:<span className="required_red">*</span></label>
                                            <input className="form-control" type="text" id="name" name="name" onChange={handleChange}/>
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
                                                        <option value={category.id} key={category.name}>{category.name}</option>
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
                                                        <option value={id} key={id}>{name}</option>
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
                                            <input className="form-control" id="stock" name="stock_quantity" onChange={handleChange}/>
                                            <span className="small_red">Number only</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>SKU:<span className="required_red">*</span></label>
                                            <input className="form-control" id="sku" name="sku" onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Original price:<span className="required_red">*</span></label>
                                            <input className="form-control" id="price" name="price" onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Price after discount:</label>
                                            <input className="form-control" id="offer_price" name="offer_price" onChange={handleChange}/>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="description">Short Description:<span className="required_red">*</span></label>
                                        <textarea id="short_description" name="short_description" className="form-control" rows="3" onChange={handleChange}></textarea>
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
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Photos:</label>
                                            <input className="form-control" type="file" multiple="" id="photos" name="image" onChange={handleImageChange}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Video Url:</label>
                                            <input className="form-control" type="text" id="video" name="video" onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Posting Type:</label>
                                            <select className="form-select" id="product_type" name="product_type" onChange={handleChange}>
                                                <option value="">-SELECT-</option>
                                                <option value="best_product">BestDeal</option>
                                                <option value="featured">Featured</option>
                                                <option value="new_arrival">New Arrival</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Status:</label>
                                            <select className="form-select" id="status" name="status" onChange={handleChange}>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
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

export default AddProduct;