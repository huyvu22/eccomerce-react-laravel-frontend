import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../HeaderSlice";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {resetCart} from "../../../components/ProductCard/ProductCardSlice";
import {deleteCookie, getCookie} from "../../../utils/dataHandler";

const NavbarItemBuyers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isUserAuthenticated = useSelector(
        (state) => state.loginUser.isUserAuthenticated
    );
    const handleLogout = async () => {
        const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
        let res = await fetch("http://buynow.test/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                'Authorization': `Bearer ${userToken}`
            },
        })
        const data = await res.json();
        if (data.status === "success") {
            dispatch(logout());
            dispatch(resetCart());
            deleteCookie('user_access_token');
            deleteCookie('remember_token');
            navigate('/');
            toast.success(data.message);
        } else {
            toast.error('Something went wrong!');
        }

    };


    return (
        <ul className="dropdown-position-list">
            {(!isUserAuthenticated) && (
                <>
                    <li>
                        <Link to="buyer/login">Login</Link>
                    </li>
                    <li>
                        <Link to="buyer/register">Register</Link>
                    </li>

                </>
            )}
            <li>
                <Link to="buyer/my-profile">See My Profile</Link>
            </li>

            <li>
                <Link to="buyer/order">My Order</Link>
            </li>

            <li>
                <Link to="checkout">Check out</Link>
            </li>
            {(isUserAuthenticated) && (
                <li onClick={handleLogout}>
                    <Link to="">Logout</Link>
                </li>
            )}
        </ul>
    );
};

export default NavbarItemBuyers;