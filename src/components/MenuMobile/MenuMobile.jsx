import React, {useEffect, useState} from 'react';
import './MenuMobile.scss';
import {useDispatch, useSelector} from "react-redux";
import {hideMenu, logout} from "../../layouts/Header/HeaderSlice";
import clsx from "clsx";
import {IoMdClose} from "react-icons/io";
import {AiTwotoneHome} from "react-icons/ai";
import {SiBigcartel} from "react-icons/si";
import {MdKeyboardArrowRight, MdOutlineAlternateEmail} from "react-icons/md";
import {FaShoppingBag} from "react-icons/fa";
import {MdOutlineLiveHelp} from "react-icons/md";
import {TiContacts} from "react-icons/ti";
import {BiMinus} from "react-icons/bi";
import {BsFillPersonBadgeFill, BsFillPhoneFill} from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {resetCart} from "../ProductCard/ProductCardSlice";
import {deleteCookie, getCookie} from "../../utils/dataHandler";
import {toast} from "react-toastify";
import useClient from "../../services/Hooks/useClient";

const MenuMobile = () => {
    const isShowMenu = useSelector((state) => state.cartItems.isShowMenu);
    const [show, setShow] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const dispatch = useDispatch();
    const client = useClient();
    const navigate = useNavigate();
    const isUserAuthenticated = useSelector(
        (state) => state.loginUser.isUserAuthenticated
    );
    const isSellerAuthenticated = useSelector(
        (state) => state.loginUser.isSellerAuthenticated
    );
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');


    useEffect(() => {
        setShow(isShowMenu);
    }, [isShowMenu]);
    const handleClose = () => {
        setShow(false);
        dispatch(hideMenu(false));
        document.body.style.overflow = "unset";
    };
    const handleDropdownList = (e, navLink) => {
        e.preventDefault();
        if (activeMenu === navLink) {
            // Clicking the active menu item again will hide the dropdown
            setActiveMenu(null);
        } else {
            setActiveMenu(navLink);
        }
    }

    const handleLogout = async () => {
        const res = await client.post('logout', '', '', userToken);
        console.log(res)
        if (res.response.ok) {
            const data = await res.data;
            if (data.status === "success") {
                dispatch(logout());
                dispatch(resetCart());
                deleteCookie('user_access_token');
                deleteCookie('remember_token');
                navigate('/');
                toast.success(data.message);
                window.location.reload();
            } else {
                toast.error('Something went wrong!');
            }
        }

    };


    return (
        <aside className={clsx("menu-sidebar", show && "active")}>
            <div className="menu-header"><a href="#"><img src={logo}
                                                          alt="logo"/></a>
                <button className="menu-close" onClick={handleClose}><span><IoMdClose/></span></button>
            </div>
            <div className="menu-content">
                <ul className="nav-list">
                    <li><Link className="nav-link" to={'/'} onClick={handleClose}><span><AiTwotoneHome/></span>Home <span></span></Link></li>
                    <li onClick={(e) => handleDropdownList(e, 'about-us')}>
                        <a className={clsx("nav-link dropdown-link", activeMenu === 'about-us' ? 'active-menu' : '')} href="#">
                            <span><SiBigcartel/></span>About Us
                            <span className={clsx('', activeMenu === 'about-us' && 'active-arrow')}><MdKeyboardArrowRight size={"1.2em"}/></span>
                        </a>
                        <ul className={clsx("dropdown-list", activeMenu === 'about-us' ? 'show-list' : '')}>
                            <li><Link to='about-us' onClick={handleClose}> <span><BiMinus/></span> About Us</Link></li>
                            <li><Link to='terms-and-condition' onClick={handleClose}><span><BiMinus/></span> Terms &amp; Condition</Link></li>
                            <li><Link to='privacy-policy' onClick={handleClose}> <span><BiMinus/></span> Privacy Policy</Link></li>
                        </ul>
                    </li>
                    <li onClick={(e) => handleDropdownList(e, 'buyers')}>
                        <a className={clsx("nav-link dropdown-link", activeMenu === 'buyers' ? 'active-menu' : '')}
                           href="#"><span><BsFillPersonBadgeFill/></span>Buyers <span className={clsx('', activeMenu === 'buyers' && 'active-arrow')}><MdKeyboardArrowRight
                            size={"1.2em"}/></span></a>
                        <ul className={clsx("dropdown-list", activeMenu === 'buyers' ? 'show-list' : '')}>

                            {(!isUserAuthenticated) && (
                                <>
                                    <li><Link to="buyer/login" onClick={handleClose}> <span><BiMinus/></span> Login</Link></li>
                                    <li><Link to="buyer/register" onClick={handleClose}> <span><BiMinus/></span> Registration</Link></li>

                                </>
                            )}
                            <li onClick={handleClose}><Link to="buyer/my-profile"> <span><BiMinus/></span> Update Profile</Link></li>
                            <li onClick={handleClose}><Link to="buyer/order"> <span><BiMinus/></span> My Orders</Link></li>
                            <li onClick={handleClose}><Link to="checkout"><span><BiMinus/></span> Check out</Link></li>
                            {(isUserAuthenticated) && (
                                <li onClick={handleLogout}>
                                    <Link to=""><span><BiMinus/></span> Logout</Link>
                                </li>
                            )}
                        </ul>
                    </li>
                    <li onClick={(e) => handleDropdownList(e, 'vendors')}>
                        <a className={clsx("nav-link dropdown-link", activeMenu === 'vendors' ? 'active-menu' : '')}
                           href="#"><span><FaShoppingBag/></span>Vendors <span className={clsx('', activeMenu === 'vendors' && 'active-arrow')}><MdKeyboardArrowRight
                            size={"1.2em"}/></span></a>
                        <ul className={clsx("dropdown-list", activeMenu === 'vendors' ? 'show-list' : '')}>
                            {(isSellerAuthenticated === false) &&
                                <>
                                    <li onClick={handleClose}><Link to="seller/login"> <span><BiMinus/></span> Login</Link></li>
                                    <li onClick={handleClose}><Link to="seller/register"> <span><BiMinus/></span> Registration</Link></li>
                                </>

                            }
                            <li onClick={handleClose}><Link to="item/products/add"> <span><BiMinus/></span> Add Item</Link></li>
                            <li onClick={handleClose}><Link to="seller/my-profile"> <span><BiMinus/></span> See My Profile</Link></li>
                            <li onClick={handleClose}><Link to="item/my-products"> <span><BiMinus/></span> My Post</Link></li>
                            <li onClick={handleClose}><Link to="seller/ordered_products"> <span><BiMinus/></span> Ordered Products</Link></li>
                            {(isSellerAuthenticated === true) && (
                                <li onClick={handleLogout}>
                                    <Link to=""><span><BiMinus/></span> Logout</Link>
                                </li>
                            )}
                        </ul>
                    </li>
                    <li onClick={(e) => handleDropdownList(e, 'need-help')}><Link to={'site/faq'} className="nav-link" onClick={handleClose}><span><MdOutlineLiveHelp/></span>need
                        help <span></span></Link></li>
                    <li onClick={(e) => handleDropdownList(e, 'contact-us')}><Link to={'contact-us'} className="nav-link" onClick={handleClose}><span><TiContacts/></span>contact
                        us <span></span></Link></li>

                </ul>
                <div className="nav-info-group">
                    <div className="nav-info">
                        <span><BsFillPhoneFill/></span>
                        <p><small>call us</small> <br/><span>+91-9876543210</span></p>
                    </div>
                    <div className="nav-info">
                        <span><MdOutlineAlternateEmail/></span>
                        <p><small>email us</small> <br/><span>sales@yourcompany.com</span></p>
                    </div>
                </div>
                <div className="nav-footer">
                    <p>2023 All right Reserved</p>
                </div>
            </div>
        </aside>
    );
};

export default MenuMobile;