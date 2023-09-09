import './Order.scss';
import React, {useEffect, useState} from 'react';
import SingleBanner from "../../components/SingleBanner/SingleBanner";
import useClient from "../../services/Hooks/useClient";
import moment from 'moment';
import {FaLink} from "react-icons/fa";
import {Link} from "react-router-dom";
import {getCookie} from "../../utils/dataHandler";

const Order = () => {
    const client = useClient();
    const [orders, setOrders] = useState([]);
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const [loading, setLoading] = useState(true);
    const getAllOrders = async () => {
        const res = await client.get('orders', '', userToken);
        if (res.response.ok === true) {
            const orderData = await res.data.data;
            setOrders(orderData);
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllOrders();
    }, []);
    return (
        <>
            <SingleBanner name="My Order"/>
            {
                loading === true
                    ?
                    <div className="loading">
                        <h3>Loading...</h3>
                    </div>
                    :
                    <section className='inner-section order-part'>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="orderlist">
                                        <div className="orderlist-header">

                                        </div>
                                        <div className="orderlist-body">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="table-scroll">
                                                        <table className="table-list">
                                                            <thead>
                                                            <tr>
                                                                <th width="5%">Serial</th>
                                                                <th>Orders</th>
                                                                <th>Amount</th>
                                                                <th>Method</th>
                                                                <th>TXN</th>
                                                                <th>Status</th>
                                                                <th>Date</th>
                                                            </tr>
                                                            </thead>

                                                            <tbody>
                                                            {
                                                                orders?.length ?
                                                                    orders?.map((order, index) => (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <td><Link to={`/buyer/order/${order.invoice}`}>{order.invoice}<i><FaLink size="0.8rem"/></i></Link></td>
                                                                            <td>{order.amount}</td>
                                                                            <td>{order.payment_method}</td>
                                                                            <td></td>
                                                                            <td>{order.payment_status === 1 ? 'Paid' : 'Incomplete'}</td>
                                                                            <td>{moment(order.created_at).format('Do MMMM, YYYY')}</td>
                                                                        </tr>
                                                                    )) :
                                                                    <tr>
                                                                        <td colSpan={7}><h3 className="text-center mt-3">Empty Order</h3></td>
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
                        </div>
                    </section>
            }

        </>
    );
};

export default Order;