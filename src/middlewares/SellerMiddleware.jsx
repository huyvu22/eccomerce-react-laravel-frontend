import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {getCookie} from "../utils/dataHandler";
import useClient from "../services/Hooks/useClient";

export default function SellerMiddleware() {
    const sellerToken = getCookie('seller_access_token')
    const client = useClient();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const isLoggedIn = async () => {
        try {
            const res = await client.post('check-token', '', '', sellerToken);
            const resData = await res.data;
            if (res.response.ok) {
                return resData.valid;
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
        return <div className="loading">
            <h3>Loading...</h3>
        </div>;
    }

    return loggedIn ? <Outlet/> : <Navigate to="/seller/login"/>;

}


