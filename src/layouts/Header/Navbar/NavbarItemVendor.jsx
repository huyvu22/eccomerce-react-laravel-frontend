import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../HeaderSlice";
import {toast} from "react-toastify";
import {resetCart} from "../../../components/ProductCard/ProductCardSlice";

const NavbarItemVendor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSellerAuthenticated = useSelector(
        (state) => state.loginUser.isSellerAuthenticated
    );

    const handleLogout = async () => {
        const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));
        let res = await fetch("http://buynow.test/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                'Authorization': `Bearer ${sellerToken?.token}`
            },
        })
        const data = await res.json();
        if (data.status === "success") {
            dispatch(logout());
            dispatch(resetCart());
            navigate('/');
            toast.success(data.message);
        } else {
            toast.error('Something went wrong!');
        }

    };

    const fetchUserData = async (token) => {
        const headers = {
            "Content-Type": "application/json",
        };

        // Nếu có token xác thực, thêm vào header Authorization
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "GET",
                headers,
            });
            return response;
        } catch (error) {
            console.error(error);
            // Xử lý lỗi tại đây nếu cần thiết
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
