import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {login} from "../layouts/Header/HeaderSlice";
import {getCookie} from "../utils/dataHandler";

export default function AuthMiddleware() {
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isLoggedIn = async () => {
        try {
            const res = await fetch('http://buynow.test/api/check-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
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

    const isRememberLogin = async () => {
        const rememberToken = getCookie('remember_token');
        try {
            const res = await fetch(`http://buynow.test/api/check-remember?remember_token=${rememberToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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


    // if (loggedIn && (location.pathname === '/buyer/login')) {
    //     return <Navigate to="/"/>;
    // }
    //
    // if (isLoading) {
    //     return null;
    // }
    //
    // return <Outlet/>;

    if (isLoading) {
        return null;
    }

    return loggedIn ? <Outlet/> : <Navigate to="/buyer/login"/>;
}


