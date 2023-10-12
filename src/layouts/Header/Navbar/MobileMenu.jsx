import React, {useEffect, useState} from 'react';
import {BsFillSuitHeartFill} from "react-icons/bs";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {FaHome} from "react-icons/fa";
import {FaListUl} from "react-icons/fa";
import {BiCategoryAlt} from "react-icons/bi";
import {showCart, showCategory, showMenu} from "../HeaderSlice";
import {useDispatch, useSelector} from "react-redux";
import useMyCart from "../../../services/Hooks/useMyCart";
import {getCookie} from "../../../utils/dataHandler";
import useClient from "../../../services/Hooks/useClient";
import {Link, useNavigate} from "react-router-dom";

const MobileMenu = () => {
    const dispatch = useDispatch();
    const client = useClient();
    const navigate = useNavigate();
    const [myCart] = useMyCart();
    const [wishList, setWishList] = useState([]);
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const favoriteItems = useSelector((state) => state.productCard.wishList);

    const getWishList = async () => {
        if (userToken) {
            const res = await client.get('wishlist', '', userToken);
            if (res.response.ok === true) {
                const dataObj = await res.data;
                setWishList(dataObj.data)
            }
        }
    }
    useEffect(() => {
        getWishList()
    }, [favoriteItems]);
    const handleShowCart = () => {
        dispatch(showCart(true));
        document.body.style.overflow = "hidden";
    };

    const handleShowCate = () => {
        dispatch(showCategory(true));
        document.body.style.overflow = "hidden";
    };

    const handleShowMenu = () => {
        dispatch(showMenu(true));
        document.body.style.overflow = "hidden";
    };
    return (

        <div className="mobile-menu">
            <Link to="/"><span><FaHome/></span><span>Home</span></Link>
            <button onClick={handleShowMenu}><span><BiCategoryAlt/></span><span>Menu</span></button>
            <button onClick={handleShowCate}><span><FaListUl/></span><span>category</span></button>
            <button onClick={handleShowCart}><span><AiOutlineShoppingCart/></span><span>cartlist</span><sup>{myCart?.length ?? 0}</sup></button>
            <button onClick={() => (navigate('buyer/wishlist'))}>
                <span><BsFillSuitHeartFill/></span><span>Wishlist</span><sup>{wishList?.length ?? wishList.length}</sup></button>
        </div>

    );
};

export default MobileMenu;