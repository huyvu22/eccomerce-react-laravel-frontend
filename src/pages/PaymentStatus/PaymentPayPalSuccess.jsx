import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetCart} from "../../components/ProductCard/ProductCardSlice";

const PaymentPayPalSuccess = () => {
    const userToken = JSON.parse(localStorage.getItem('userToken')) || JSON.parse(localStorage.getItem('sellerToken'));
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [loading, setLoading] = useState(false);
    const handlePaymentSuccess = async () => {
        const response = await fetch(`http://buynow.test/api/paypal/success?token=${token}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })

        const payment = await response.json();
        if (payment.status === 'success') {
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
                'responseId': payment.data
            })
            const response = await fetch(`http://buynow.test/api/cart-list`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': `Bearer ${userToken?.token}`,
                },
                body: formData
            })

            const cartData = await response.json();
            if (cartData?.status === 'success') {
                setLoading(false);
                dispatch(resetCart());
            }
        }
    }
    useEffect(() => {
        handlePaymentSuccess()
    }, []);

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

export default PaymentPayPalSuccess;