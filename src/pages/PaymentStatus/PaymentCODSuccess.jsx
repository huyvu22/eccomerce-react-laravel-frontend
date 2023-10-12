import React, {useEffect, useState} from 'react';
import useClient from "../../services/Hooks/useClient";
import _ from "lodash";
import {resetCart} from "../../components/ProductCard/ProductCardSlice";
import {useDispatch} from "react-redux";
import {getCookie} from "../../utils/dataHandler";
import config from "../../configs/Config.json";

const PaymentCodSuccess = () => {
    const client = useClient();
    const [loading, setLoading] = useState(false);
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const dispatch = useDispatch();
    const {SERVER_API} = config;

    let formData = JSON.stringify({
        'my_cart': sessionStorage.getItem('my_cart'),
        'payment_method': sessionStorage.getItem('payment_method'),
        'shipping_method': sessionStorage.getItem('shipping_method'),
        'order_address': sessionStorage.getItem('order_address'),
        'order_method': sessionStorage.getItem('order_method'),
        'coupon': sessionStorage.getItem('couponCode'),
        'sub-total': sessionStorage.getItem('sub_total'),
        'amount': sessionStorage.getItem('amount'),
        'responseId': _.random(1000, 9999)
    })
    const storeOrder = async () => {
        setLoading(true);
        // const response = await fetch(`http://buynow.com/api/cart-list`, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //         'accept': 'application/json',
        //         'Authorization': `Bearer ${userToken}`,
        //     },
        //     body: formData
        // })

        const response = await fetch(`${SERVER_API}cart-list`, {
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
            sessionStorage.clear()
        }

        // const res = client.post('cart-list', formData, '', userToken)
        // if (res.response.ok) {
        //     const data = await res.data;
        //     if (data.status === 'success') {
        //         setLoading(false);
        //         dispatch(resetCart());
        //         sessionStorage.clear();
        //     }
        // }
    };

    useEffect(() => {
        storeOrder()
    }, []);

    return (
        <>
            {
                loading ?
                    <div className="loading mt-5">
                        <h3>Loading...</h3>
                    </div>
                    :
                    <h1 className="text-center mt-5">Order Successfully</h1>
            }

        </>
    );
};

export default PaymentCodSuccess;