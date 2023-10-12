import './ListProducts.scss';
import React, {useEffect, useState} from 'react';
import SingleBanner from "../../../../components/SingleBanner/SingleBanner";
import {FiEdit} from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import {asset} from "../../../../services/Helpers/Image/image";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
import {getCookie} from "../../../../utils/dataHandler";
import useClient from "../../../../services/Hooks/useClient";
import config from "../../../../configs/Config.json";
import {formatter} from "../../../../services/Helpers/Number/Number";
import {textLimit} from "../../../../services/Helpers/string/String";

const ListProducts = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [paginate, setPaginate] = useState(null);
    const {SERVER_API} = config;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPageArr = Array.from({length: paginate?.last_page}, (_, i) => i + 1);
    const sellerToken = getCookie('seller_access_token')
    const navigate = useNavigate();
    const client = useClient();

    const getMyProducts = async () => {
        if (!sellerToken) {
            console.error('User token not found');
            return;
        }

        const res = await client.get('seller/products', `page=${currentPage}`, sellerToken);
        if (res.response.ok) {
            const dataObj = await res.data;
            if (dataObj?.status === 'success') {
                setProducts(dataObj.data.data);
                setPaginate(dataObj.data);
                setLoading(false);
                window.scrollTo(0, 400);
            }
        }
    }

    useEffect(() => {
        getMyProducts();
    }, [currentPage]);


    const handleUpdateStatus = async (e, product) => {
        const newStatus = product.status === 1 ? 0 : 1;
        setProducts(prevProducts =>
            prevProducts.map(prevProduct =>
                prevProduct.id === product.id ? {...prevProduct, status: newStatus} : prevProduct
            )
        );

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("image", product.image);
        formData.append("category", product.category_id);
        formData.append("sub_category", product.sub_category_id);
        formData.append("sku", product.sku);
        formData.append("price", product.price);
        formData.append("offer_price", product.offer_price);
        formData.append("stock_quantity", product.quantity);
        formData.append("short_description", product.short_description);
        formData.append("full_description", product.full_description);
        formData.append("product_type", product.product_type);
        formData.append("status", newStatus);
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

    }

    const handleDeleteProduct = async (product) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Remove product from your shop !!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // let res = await fetch(`http://buynow.test/api/seller/products/${product.id}`, {
                //     method: "DELETE",
                //     headers: {
                //         'Authorization': `Bearer ${sellerToken}`,
                //     },
                // })
                // const response = await res.json();

                const res = await client.delete(`seller/products/${product.id}`, '', sellerToken);
                const response = res.data;
                if (res.ok) {
                    Swal.fire(
                        'Deleted!',
                        'Product has been removed.',
                        'success'
                    )
                    getMyProducts()
                } else {
                    toast(response.message);
                }
            }
        })
    }
    const handlePage = (page) => {
        setCurrentPage(page);
    }

    return (
        <>
            <SingleBanner name="My Products"/>
            {
                loading === true ?
                    <div className="loading">
                        <h3>Loading...</h3>
                    </div>
                    :
                    <section className="inner-section my-products">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="orderlist">
                                        <div className="orderlist-head">
                                            <h5>Total products: {paginate?.total}</h5>
                                        </div>
                                        <div className="orderlist-body">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="table-scroll">
                                                        <table className="table-list">
                                                            <thead>
                                                            <tr>
                                                                <th scope="col">No.</th>
                                                                <th scope="col">Product</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Price</th>
                                                                <th scope="col">Stock</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                products.length ?
                                                                    products.map((product, index) => (
                                                                        <tr key={index + 1}>
                                                                            <td className="table-serial">
                                                                                <h6>{index + 1}.</h6>
                                                                            </td>
                                                                            <td className="table-image"><img
                                                                                alt="img" src={asset(product.thumb_image)}/></td>
                                                                            <td className="table-name">
                                                                                <h6><Link to={`/item/item_details/${product.id}/${product.slug}`}>{textLimit(product.name)}</Link>
                                                                                </h6>
                                                                            </td>
                                                                            <td className="table-price">
                                                                                <h6>{formatter.format(product.offer_price)}</h6>
                                                                            </td>
                                                                            <td className="table-stock">
                                                                                <h6 className="stock-in">{product.quantity}</h6>
                                                                            </td>
                                                                            <td className="table-status">
                                                                                <div className="form-check form-switch">
                                                                                    <input className="form-check-input" checked={product.status === 1} type="checkbox"
                                                                                           role="switch"
                                                                                           id="flexSwitchCheckChecked" onChange={(e) => handleUpdateStatus(e, product)}/>
                                                                                </div>
                                                                            </td>
                                                                            <td className="table-action">
                                                                                <a><span className="edit"
                                                                                         onClick={() => navigate(`/item/products/edit/${product.id}/${product.slug}`)}><FiEdit/></span></a>
                                                                                <a><span className="bin" onClick={() => handleDeleteProduct(product)}><RiDeleteBin6Line/></span></a>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                    :
                                                                    <tr>
                                                                        <td colSpan={7}>Empty Post!</td>
                                                                    </tr>

                                                            }

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bottom-paginate">
                                        <p>Showing {paginate?.from ? paginate?.from : 0} to {paginate?.to ? paginate?.to : 0} of {paginate?.total} Results</p>
                                        {
                                            products?.length ?
                                                <ul>
                                                    {
                                                        currentPage >= 2 &&
                                                        <li className="page-item" onClick={() => handlePage(currentPage - 1)}>
                                                            <span><MdNavigateBefore/></span></li>
                                                    }
                                                    {
                                                        totalPageArr?.map((page) =>
                                                            <li key={page}
                                                                className={`page-item ${currentPage === page ? 'active' : ''}`}
                                                                onClick={() => handlePage(page)}
                                                            >{page}</li>
                                                        )
                                                    }
                                                    {
                                                        currentPage < paginate?.last_page &&
                                                        <li className="page-item" onClick={() => handlePage(currentPage + 1)}>
                                                            <span><MdNavigateNext/></span>
                                                        </li>
                                                    }

                                                </ul>
                                                :
                                                null
                                        }
                                    </div>

                                </div>

                            </div>
                        </div>

                    </section>
            }
        </>

    );
};

export default ListProducts;