import React, {Fragment, useEffect, useState} from 'react'
import './Main.scss'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import {useDispatch, useSelector} from 'react-redux';
import {hideCart} from "../Header/HeaderSlice";
import RouteCore from "../../services/Routes/RouteCore";
import CartSideBar from "../../components/CartSideBar/CartSideBar";
import Social from "../../components/Social/Social";
import {Route, Routes} from "react-router-dom";
import Login from "../../pages/Auth/Login/Login";
import Register from "../../pages/Auth/Register/Register";
import ForgotPass from "../../pages/Auth/Forgot/ForgotPass";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import SellerMiddleware from "../../middlewares/SellerMiddleware";

function Main() {
    const dispatch = useDispatch();
    const isShow = useSelector((state) => state.cartItems.isShow);
    const [showBackDrop, setShowBackDrop] = useState(false);
    useEffect(() => {
        setShowBackDrop(isShow);
    }, [isShow]);

    const handleClose = () => {
        dispatch(hideCart(false))
        setShowBackDrop(false);
        document.body.style.overflow = 'unset';
    }

    return (
        <>
            <div className="back-drop" style={{display: `${showBackDrop ? 'block' : 'none'}`}} onClick={handleClose}></div>
            <Routes>
                <Route path="buyer/login" element={<LoginLayout/>}/>
                <Route path="buyer/register" element={<RegisterLayout/>}/>
                <Route path="buyer/forgot" element={<ForgotPasswordLayout/>}/>
                <Route path="seller/login" element={<LoginLayout/>}/>
                <Route path="seller/register" element={<RegisterLayout/>}/>
                <Route path="/*" element={<MainLayout/>}/>
            </Routes>

        </>
    )
}

function MainLayout() {
    return (
        <>
            <Header/>
            <RouteCore/>
            <Social/>
            <CartSideBar/>
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