import React, {Fragment, useEffect, useRef, useState} from 'react';
import './Main.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../assets/styles/scss/styles.scss'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import {useDispatch, useSelector} from 'react-redux';
import {clearKeywords, hideCart, hideCategory, hideMenu, onFocus, updateKeywords} from "../Header/HeaderSlice";
import RouteCore from "../../services/Routes/RouteCore";
import CartSideBar from "../../components/CartSideBar/CartSideBar";
import Social from "../../components/Social/Social";
import {Route, Routes} from "react-router-dom";
import Login from "../../pages/Auth/Login/Login";
import Register from "../../pages/Auth/Register/Register";
import ForgotPass from "../../pages/Auth/Forgot/ForgotPass";
import CategorySideBar from "../../components/CategorySideBar/CategorySideBar";
import MenuMobile from "../../components/MenuMobile/MenuMobile";

function Main() {
    const dispatch = useDispatch();
    const searchRef = useRef(null);
    const formRef = useRef(null);
    const isShow = useSelector((state) => state.cartItems.isShow);
    const isShowCate = useSelector((state) => state.cartItems.isShowCate);
    const isShowMenu = useSelector((state) => state.cartItems.isShowMenu);
    const isFocus = useSelector((state) => state.searchProducts.inputSearchFocus);
    const [showBackDrop, setShowBackDrop] = useState(false);
    

    useEffect(() => {
        setShowBackDrop(isShow);
    }, [isShow]);

    useEffect(() => {
        setShowBackDrop(isShowCate);
    }, [isShowCate]);

    useEffect(() => {
        setShowBackDrop(isFocus)
    }, [isFocus]);

    useEffect(() => {
        setShowBackDrop(isShowMenu)
    }, [isShowMenu]);

    useEffect(() => {
        window.scrollTo(0, 400);
    }, [])

    const handleClose = () => {
        dispatch(hideCart(false));
        dispatch(hideCategory(false));
        dispatch(hideMenu(false));
        // dispatch(clearKeywords());
        dispatch(onFocus(false))
        formRef.current.style.zIndex = 0;
        searchRef.current.style.display = 'none';
        setShowBackDrop(false);
        document.body.style.overflow = 'unset';
    }

    return (
        <>
            <div className="back-drop" style={{display: `${showBackDrop ? 'block' : 'none'}`}} onClick={handleClose}></div>
            <Routes>
                <Route path="/*" element={<MainLayout formRef={formRef} searchRef={searchRef} handleClose={handleClose}/>}/>
                <Route path="buyer/login" element={<LoginLayout/>}/>
                <Route path="buyer/register" element={<RegisterLayout/>}/>
                <Route path="buyer/forgot" element={<ForgotPasswordLayout/>}/>
                <Route path="seller/login" element={<LoginLayout/>}/>
                <Route path="seller/register" element={<RegisterLayout/>}/>
            </Routes>
        </>
    )
}

function MainLayout({formRef, searchRef, handleClose}) {
    return (
        <>
            <Header formRef={formRef} searchRef={searchRef} handleClose={handleClose}/>
            <RouteCore/>
            <Social/>
            <CartSideBar/>
            <CategorySideBar/>
            <MenuMobile/>
            <ScrollButton/>
            <Footer/>
        </>
    );
}

function LoginLayout() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </>
    );
}

function RegisterLayout() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Register/>}/>
            </Routes>
        </>
    );
}

function ForgotPasswordLayout() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ForgotPass/>}/>
            </Routes>
        </>
    );
}


export default Main;