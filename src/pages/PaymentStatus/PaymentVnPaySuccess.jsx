import React, {useEffect, useState} from 'react';
import {getCookie} from "../../utils/dataHandler";
import {useDispatch} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {resetCart} from "../../components/ProductCard/ProductCardSlice";
import {toast} from "react-toastify";

const PaymentVnPaySuccess = () => {
    const navigate = useNavigate();
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
    const [loading, setLoading] = useState(false);
    const [checkPaymentSuccess, setCheckPaymentSuccess] = useState(false)

    const handlePaymentSuccess = async () => {
        if (checkPaymentSuccess === false) {
            setLoading(true);
            let formData = JSON.stringify({
                'my_cart': sessionStorage.getItem('my_cart'),
                'payment_method': sessionStorage.getItem('payment_method'),
                'shipping_method': sessionStorage.getItem('shipping_method'),
                'order_address': sessionStorage.getItem('order_address'),
                'order_method': sessionStorage.getItem('order_method'),
                'coupon': sessionStorage.getItem('couponCode'),
                'sub-total': sessionStorage.getItem('sub_total'),
                'amount': sessionStorage.getItem('amount'),
                'responseId': vnp_TransactionNo
            })
            const response = await fetch(`http://buynow.test/api/cart-list`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                body: formData
            })

            const cartData = await response.json();
            if (cartData?.status === 'success') {
                setLoading(false);
                dispatch(resetCart());
                toast('Payment successful')
                setCheckPaymentSuccess(true)
            }
        }
    }
    useEffect(() => {
        if (!checkPaymentSuccess) {
            handlePaymentSuccess()
        } else {
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [checkPaymentSuccess]);
    return (
        <>
            {loading ?
                <div className="loading mt-5">
                    <h3>Loading...</h3>
                </div>
                :
                <h1 className="text-center mt-5">Payment Successful</h1>}
        </>
    );
};

export default PaymentVnPaySuccess;