import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {login} from "../../../layouts/Header/HeaderSlice";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setCookie} from "../../../utils/dataHandler";
import useClient from "../../../services/Hooks/useClient";

function GoogleCallback() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const location = useLocation();
    const client = useClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isBuyerLogin = sessionStorage.getItem('buyer-google-login');


    const fetchData = async () => {
        try {
            setLoading(true);
            // const response = await fetch(`http://buynow.com/api/login/google/callback${location.search}`, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     }
            // });
            // const responseData = await response.json();
            // setLoading(false);
            // const storageItem = isBuyerLogin === 'true' ? 'user_access_token' : 'seller_access_token';
            // dispatch(login(storageItem));
            // setCookie(storageItem, responseData.data.access_token);
            // toast('Login Successful');
            // navigate('/');
            const res = await client.get(`login/google/callback${location.search}`);
            if (res.response.ok) {
                setLoading(false);
                const responseData = await res.data;
                const storageItem = isBuyerLogin === 'true' ? 'user_access_token' : 'seller_access_token';
                dispatch(login(storageItem));
                setCookie(storageItem, responseData.data.access_token);
                toast('Login Successful');
                navigate('/');
            }

        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    if (loading) {
        return <DisplayLoading/>;
    } else {
        return null;
    }
}

function DisplayLoading() {
    return (
        <div className="loading">
            <h3>Loading...</h3>
        </div>
    );
}

export default GoogleCallback;