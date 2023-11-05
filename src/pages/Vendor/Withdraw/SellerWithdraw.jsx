import './SellerWithDraw.scss';
import React, {useEffect, useState} from 'react';
import SingleBanner from "../../../components/SingleBanner/SingleBanner";
import WithdrawRequestModal from "../../../components/Modal/WithdrawRequest/WithdrawRequestModal";
import {getCookie} from "../../../utils/dataHandler";
import useClient from "../../../services/Hooks/useClient";
import {formatter} from "../../../services/Helpers/Number/Number";
import moment from "moment/moment";

const SellerWithdraw = () => {
    const client = useClient();
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [totalAmount, setTotalAmount] = useState('');
    const [withdrawRequests, setWithdrawRequests] = useState([]);
    const [sendRequest, setSendRequest] = useState(false);

    const getSellerBalance = async () => {
        setLoading(true);
        const sellerToken = getCookie('seller_access_token');
        if (!sellerToken) {
            console.error('User token not found');
            return;
        }
        const res = await client.get('seller/withdraw/balance', '', sellerToken);
        if (res.response.ok) {
            const dataObj = await res.data;
            setTotalAmount(dataObj.data.total_amount)
            setWithdrawRequests(dataObj.data.withdraw_requests)
            setLoading(false)
        }
    }

    useEffect(() => {
        getSellerBalance()
    }, [sendRequest]);

    return (
        <>
            <SingleBanner name="Withdraw"/>
            {
                loading ?
                    <div className="loading">
                        <h3>Loading...</h3>
                    </div>
                    :
                    <section className="inner-section withdraw-part">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="orderlist-filter">
                                        <h5>Balance <span>- {formatter.format(+totalAmount)}</span></h5>
                                        <div className="filter-short">
                                            <button className="form-btn" onClick={() => setModalShow(true)}>Request Withdrawal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="account-card">
                                        <div className="account-title">
                                            <h4></h4>
                                        </div>
                                        <div className="account-content">
                                            <div className="table-scroll">
                                                <table className="table-list">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Requested Amount</th>
                                                        <th scope="col">Method</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Transfered Amount</th>
                                                        <th scope="col">Status</th>

                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        withdrawRequests?.length ? (
                                                            withdrawRequests.map((withdrawRequest) => (
                                                                <React.Fragment key={withdrawRequest.id}>
                                                                    <tr>
                                                                        <td className="table-name">
                                                                            <h6>{formatter.format(withdrawRequest.total_amount)}</h6>
                                                                        </td>
                                                                        <td className="table-price">
                                                                            <h6 className="stock-out">{withdrawRequest.method}</h6>
                                                                        </td>
                                                                        <td className="table-price">
                                                                            <h6>{moment(withdrawRequest.updated_at).format('Do MMMM, YYYY')}</h6>
                                                                        </td>
                                                                        <td className="table-brand">
                                                                            <h6>{formatter.format(withdrawRequest.withdraw_amount)}</h6>
                                                                        </td>
                                                                        <td className="table-brand">
                                                                            <h6 className="stock-in">{withdrawRequest.status}</h6>
                                                                        </td>
                                                                    </tr>
                                                                </React.Fragment>
                                                            ))
                                                        ) : (
                                                            <>
                                                                <tr>
                                                                    <td className="table-name m-5" colSpan={5}>
                                                                        <h6>No withdrawal requests available.</h6>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <WithdrawRequestModal
                            show={modalShow}
                            setModalShow={setModalShow}
                            onHide={() => setModalShow(false)}
                            setSendRequest={setSendRequest}
                        />
                    </section>
            }
        </>
    );
};

export default SellerWithdraw;