import './OrderDetail.scss';
import React, {useEffect, useState} from 'react';
import {RiDeleteBin6Line} from "react-icons/ri";
import button from "bootstrap/js/src/button";
import {BiEdit} from "react-icons/bi";
import {Link, useParams} from "react-router-dom";
import useClient from "../../../services/Hooks/useClient";
import {asset} from "../../../services/Helpers/Image/image";
import SingleBanner from "../../../components/SingleBanner/SingleBanner";
import {toast} from "react-toastify";
import {getCookie} from "../../../utils/dataHandler";

const SellerOrderDetail = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const {id} = useParams();
    const client = useClient();
    const [order, setOrder] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
    const [orderAddress, setOrderAddress] = useState([]);
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const [loading, setLoading] = useState(true);
    const getOrderDetail = async () => {
        const res = await client.get(`seller/orders/detail/${id}`, '', userToken.token);
        if (res.response.ok === true) {
            const orderData = await res.data.data;
            setOrder(orderData[0]);
            setOrderProducts(orderData[0].order_product)
            setOrderAddress(JSON.parse(orderData[0].order_address))
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrderDetail();
    }, []);
    const handleDivClick = (index) => {
        setActiveIndex(index);
    };

    const handleOrderTypeChange = async (e) => {
        const res = await client.post(`seller/set-order-status/${id}/${e.target.value}`, '', '', userToken.token);
        if (res.response.ok === true) {
            const orderData = await res.data;
            toast.success(orderData.message)
            setOrder(orderData.data);
        }
    }
    return (
        <>
            <SingleBanner name="Order Details"/>
            {
                loading === true ?
                    <div className="loading">
                        <h3>Loading...</h3>
                    </div>
                    :
                    <section className="order-detail-part">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="account-card">
                                        <div className="account-title">
                                            <h5>Order Details (ID: {id})</h5>
                                            <div className="filter-short">
                                                <label htmlFor=""><b>Set Order Status:</b></label>
                                                <select className="form-select" onChange={(e) => handleOrderTypeChange(e)} name="order_type" id="order_type">
                                                    <option value="pending" selected={order.order_status === 'pending'}>pending</option>
                                                    <option value="process_and_ready_to_ship"
                                                            selected={order.order_status === 'process_and_ready_to_ship'}>process_and_ready_to_ship
                                                    </option>
                                                    <option value="canceled" selected={order.order_status === 'canceled'}>canceled</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="account-content">
                                            <div className="table-wrapper">
                                                <table>
                                                    <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Shipment</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        orderProducts.length &&
                                                        orderProducts.map((item, index) => (
                                                            <tr key={index}>

                                                                <td width="20%">
                                                                    <img src={asset(item.product_image)} alt="img"/>
                                                                </td>
                                                                <td>
                                                                    <Link to={`/item/item_details/${item.id}/${item.slug}`}>
                                                                        {item.name}
                                                                    </Link>
                                                                </td>
                                                                <td>${item.price} x {item.quantity} = ${item.price * item.quantity}</td>
                                                                <td>{order.order_status}</td>
                                                                {/*<td>*/}
                                                                {/*    <span>*/}
                                                                {/*      <RiDeleteBin6Line/>*/}
                                                                {/*    </span>*/}
                                                                {/*</td>*/}
                                                            </tr>
                                                        ))
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="checkout-detail">
                                                <ul>
                                                    <li><span>Sub Total</span><span>${order.sub_total}</span></li>
                                                    <li><span>Delivery Fee</span><span>{order.shipping_method === 'Free Ship' ? '$0' : '$5'}</span></li>
                                                    <li><span>Discount</span><span>$0</span></li>
                                                    <li><span>Grand Total</span><span>${order.amount}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-lg-12">
                                    <div className="account-card">
                                        <div className="account-title">
                                            <h3>Contact Information's</h3>
                                        </div>
                                        <div className="account-content">
                                            <div className="row">
                                                <div className="col-md-6 col-lg-4">
                                                    <div className={`profile-card contact ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleDivClick(0)}>
                                                        <h3>Phone</h3>
                                                        <p>{orderAddress.phone}</p>
                                                        <ul>
                                                            <li>
                                                                <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#phone-edit">
                                                                    <span><BiEdit/></span></button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className={`profile-card contact ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleDivClick(1)}>
                                                        <h3>Address</h3>
                                                        <p>
                                                            {orderAddress?.address},
                                                            {orderAddress?.ward && ` ${JSON.parse(orderAddress?.ward)?.label}`},
                                                            {orderAddress?.district && ` ${JSON.parse(orderAddress?.district)?.label}`},
                                                            {orderAddress?.province && ` ${JSON.parse(orderAddress?.province)?.label}`}
                                                        </p>
                                                        <ul>
                                                            <li>
                                                                <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#phone-edit">
                                                                    <span><BiEdit/></span></button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className={`profile-card contact ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleDivClick(2)}>
                                                        <h3>Note</h3>
                                                        <p>{orderAddress.note}</p>
                                                        <ul>
                                                            <li>
                                                                <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#phone-edit">
                                                                    <span><BiEdit/></span></button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }

        </>
    );
};

export default SellerOrderDetail;