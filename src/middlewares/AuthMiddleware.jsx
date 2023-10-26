import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {login} from "../layouts/Header/HeaderSlice";
import {getCookie} from "../utils/dataHandler";
import useClient from "../services/Hooks/useClient";

export default function AuthMiddleware() {
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const location = useLocation();
    const client = useClient();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isLoggedIn = async () => {
        try {

            const res = await client.post('check-token', '', '', userToken);
            const resData = await res.data;
            if (res.response.ok) {
                return resData.valid;
            }

        } catch (error) {
            console.error('Error checking token:', error);
            return false;
        }
    };

    const isRememberLogin = async () => {
        const rememberToken = getCookie('remember_token');
        try {
            const res = await client.post(`check-remember?remember_token=${rememberToken}`, '', '', userToken);
            const resData = await res.data;
            if (res.response.ok) {
                return resData.valid;
            }


        } catch (error) {
            console.error('Error checking token:', error);
            return false;
        }
    }

    const checkRememberLogin = async () => {
        const loggedIn = await isRememberLogin();
        setLoggedIn(loggedIn);
        setIsLoading(false);
    };

    useEffect(() => {
        // checkRememberLogin();
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

    return loggedIn ? <Outlet/> : <Navigate to="/buyer/login"/>;
}


