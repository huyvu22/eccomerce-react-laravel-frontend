import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../HeaderSlice";
import {toast} from "react-toastify";
import {resetCart} from "../../../components/ProductCard/ProductCardSlice";
import {deleteCookie, getCookie} from "../../../utils/dataHandler";
import useClient from "../../../services/Hooks/useClient";

const NavbarItemVendor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const client = useClient();
    const isSellerAuthenticated = useSelector(
        (state) => state.loginUser.isSellerAuthenticated
    );
    const userToken = getCookie('seller_access_token');

    const handleLogout = async () => {

        const res = await client.post('logout', '', '', userToken);
        if (res.response.ok) {
            const data = await res.data;
            if (data.status === "success") {
                dispatch(logout());
                dispatch(resetCart());
                deleteCookie('seller_access_token');
                navigate('/');
                toast.success(data.message);
            } else {
                toast.error('Something went wrong!');
            }
        }
    };


    return (
        <ul className="dropdown-position-list">
            {(isSellerAuthenticated === false) &&
                <>
                    <li>
                        <Link to="seller/login">Login</Link>
                    </li>
                    <li>
                        <Link to="seller/register">Registration</Link>
                    </li>
                </>

            }
            <li>
                <Link to="seller/my-profile">See My Profile</Link>
            </li>
            <li>
                <Link to="item/my-products">My Post</Link>
            </li>
            <li>
                <Link to="item/products/add">Add Product</Link>
            </li>
            <li>
                <Link to="seller/ordered_products">Ordered Products</Link>
            </li>
            {(isSellerAuthenticated === true) && (
                <li onClick={handleLogout}>
                    <Link to="">Logout</Link>
                </li>
            )}
        </ul>
    );
};

export default NavbarItemVendor;
