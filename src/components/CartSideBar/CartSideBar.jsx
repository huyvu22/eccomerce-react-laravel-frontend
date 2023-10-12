import React, {useEffect, useState} from "react";
import "./CartSideBar.scss";
import {FaShoppingBasket} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";
import {useSelector, useDispatch} from "react-redux";
import clsx from "clsx";
import {hideCart} from "../../layouts/Header/HeaderSlice";
import useMyCart from "../../services/Hooks/useMyCart";
import "sweetalert2/src/sweetalert2.scss";
import {toast} from "react-toastify";
import CartItem from "./CartItem/CartItem";
import {Link, useNavigate} from "react-router-dom";
import useClient from "../../services/Hooks/useClient";
import {useSubTotalPrice} from "../../services/Hooks/useTotalPrice";
import {formatter} from "../../services/Helpers/Number/Number";

const CartSideBar = () => {
    const dispatch = useDispatch();
    const client = useClient();
    const isShowCart = useSelector((state) => state.cartItems.isShow);
    const [show, setShow] = useState(false);
    const [myCart] = useMyCart();
    const [showCoupon, setShowCoupon] = useState(false);
    const valueCoupon = sessionStorage.getItem('couponCode') || '';
    const [couponCode, setCouponCode] = useState(valueCoupon);
    const subTotal = useSubTotalPrice();

    useEffect(() => {
        setShow(isShowCart);
    }, [isShowCart]);
    const handleClose = () => {
        setShow(false);
        dispatch(hideCart(false));
        document.body.style.overflow = "unset";
    };

    const handleSubmitCoupon = async () => {
        if (couponCode === '') {
            sessionStorage.removeItem('couponCode');
            sessionStorage.removeItem('discountValue');
            setCouponCode('');
        } else {
            try {
                const res = await client.get(`coupon/${couponCode}`);
                if (res.data.status === 'success') {
                    toast('Apply coupon successfully!');
                    sessionStorage.setItem('couponCode', res.data.coupon.code);
                    sessionStorage.setItem('discountValue', res.data.coupon.discount);

                } else {
                    toast(res.data.message);
                }
            } catch (error) {
                console.error('Error fetching coupon:', error);
            }
        }

    }


    return (
        <aside className={clsx("cart-sidebar", show && "active-cart")}>
            <div className="cart-header">
                <div className="cart-subTotal">
                    <span><FaShoppingBasket/></span><span>Total Item ({myCart.length})</span>
                </div>
                <button className="cart-close" onClick={handleClose}>
                    <span><IoMdClose/></span>
                </button>
            </div>
            <ul className="cart-list">
                {myCart?.length ? (
                    myCart.map((item) => <CartItem key={item.id} item={item}/>)
                ) : (
                    <p className="mt-4" style={{textAlign: "center"}}>
                        Your Shopping Cart Is Empty
                    </p>
                )}
            </ul>
            <div className="cart-footer">
                {
                    !showCoupon ?
                        <button className="coupon-btn" onClick={() => setShowCoupon(!showCoupon)}>Do you have a coupon code?</button>
                        :
                        <>
                            <form className="coupon-form">
                                <input type="text" name="coupon" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter your coupon code"/>
                                <button type="button" onClick={handleSubmitCoupon}>
                                    <span>APPLY</span>
                                </button>
                            </form>

                        </>
                }

                <Link to={myCart.length ? '/checkout' : "/"} className="cart-checkout-btn" onClick={myCart.length ? handleClose : null}>
                    <span className="checkout-label">Checkout Now</span>
                    <span className="checkout-price">{(subTotal)}</span>
                </Link>
            </div>
        </aside>
    );
};

export default CartSideBar;
