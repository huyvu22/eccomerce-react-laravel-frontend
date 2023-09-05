import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

export default function SellerMiddleware() {
    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const isLoggedIn = async () => {
        try {
            const res = await fetch('http://buynow.test/api/check-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sellerToken?.token}`
                }
            });

            const data = await res.json();
            if (data.valid === true) {
                return data.valid;
            }


        } catch (error) {
            console.error('Error checking token:', error);
            return false;
        }
    };

    useEffect(() => {
        const checkLogin = async () => {
            const loggedIn = await isLoggedIn();
            setLoggedIn(loggedIn);
            setIsLoading(false);
        };
        checkLogin();
    }, []);


    if (isLoading) {
        return null;
    }

    return loggedIn ? <Outlet/> : <Navigate to="/seller/login"/>;

}

