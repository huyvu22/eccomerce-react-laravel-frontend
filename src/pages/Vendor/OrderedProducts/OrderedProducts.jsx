import React, {useEffect, useState} from 'react';
import './OrderedProducts.scss';
import SingleBanner from "../../../components/SingleBanner/SingleBanner";
import useClient from "../../../services/Hooks/useClient";
import moment from "moment/moment";
import {Link} from "react-router-dom";
import {getCookie} from "../../../utils/dataHandler";

const OrderedProducts = () => {
    const client = useClient();
    const [orderProduct, setOrderProduct] = useState([]);
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const getAllOrdered = async () => {

        if (!userToken) {
            console.error('User token not found');
            return;
        }

        const res = await client.get('seller/ordered-products', '', userToken);

        if (res.response.ok === true) {
            const orderData = await res.data.data;
            setOrderProduct(orderData)
        }
    }
    useEffect(() => {
        getAllOrdered();
    }, []);

    const handleOrderTypeChange = async (e) => {
        const res = await client.get(`seller/orders/${e.target.value}`, '', userToken);
        if (res.response.ok === true) {
            const orderData = await res.data.data;
            setOrderProduct(orderData)
        }
    };

    useEffect(() => {
        handleOrderTypeChange();
    }, []);

    return (
        <>
            <SingleBanner name="Order Details"/>
            <section className="ordered-products-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="orderlist-filter">
                                <h5>Orders <span>- ({orderProduct.length ? orderProduct.length : 0})</span></h5>
                                <div className="filter-short">
                                    <label htmlFor=""><b>Short By:</b></label>
                                    <select className="form-select" onChange={handleOrderTypeChange} name="order_type" id="order_type">
                                        <option value="all_orders">All Ordered</option>
                                        <option value="pending">pending</option>
                                        <option value="dropped_off">dropped_off</option>
                                        <option value="shipped">shipped</option>
                                        <option value="out_of_delivery">out_of_delivery</option>
                                        <option value="delivered">delivered</option>
                                        <option value="canceled">canceled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">

                                </div>
                                <div className="account-content">
                                    <div className="table-wrapper">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Invoice</th>
                                                <th>Client</th>
                                                <th>Payment Method</th>
                                                <th>Payment</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                orderProduct?.length ?
                                                    orderProduct.map((item) => (
                                                        <tr key={item.id}>
                                                            <td><Link to={`${item.invoice_id}`} style={{color: "red"}}>{item.invoice_id}</Link></td>
                                                            <td>{item.client}</td>
                                                            <td>{item.payment_method}</td>
                                                            <td>{item.payment_status === 1 ? 'Paid' : 'Incomplete'}</td>
                                                            <td>{item.order_status}</td>
                                                            <td className="text-center">{moment(item.created_at).format('Do MMMM, YYYY')}</td>
                                                        </tr>
                                                    ))
                                                    :
                                                    <span></span>
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};


export default OrderedProducts;
