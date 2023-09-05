import "./Header.scss";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {BiSearch} from "react-icons/bi";
import {BsFillSuitHeartFill} from "react-icons/bs";
import {FaShoppingCart} from "react-icons/fa";
import {MdNotifications} from "react-icons/md";
import NavbarTitle from "./Navbar/NavbarTitle";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {showCart, updateKeywords} from "./HeaderSlice";
import Tippy from "@tippyjs/react";
import useMyCart from "../../services/Hooks/useMyCart";
import logo from "../../assets/images/logo.png";
import {debounce} from "lodash";
import {asset} from "../../services/Helpers/Image/image";
import button from "bootstrap/js/src/button";
import {useSubTotalPrice} from "../../services/Hooks/useTotalPrice";

const Header = () => {
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);
    const [offset, setOffset] = useState(0);
    const [myCart] = useMyCart();
    const favoriteItems = useSelector((state) => state.productCard.wishList);
    let keywords = useSelector((state) => state.searchProducts.keywords);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const total = useSubTotalPrice();
    const isLoggedIn = !!localStorage.getItem('userData');

    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);
        // clean up code
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleShowCart = () => {
        dispatch(showCart(true));
        document.body.style.overflow = "hidden";
    };

    const handleInputChange = (event) => {
        const newInputValue = event.target.value;
        setInputValue(newInputValue);
    };

    const handleSubmitSearchForm = (e) => {
        e.preventDefault();

        const trimmedInputValue = inputValue.trim();

        if (trimmedInputValue !== "") {
            setInputValue("");
            dispatch(updateKeywords(inputValue));
            navigate(`/products/search/${inputValue}`);
        }
    };

    return (
        <>
            <header className={clsx("header-part", offset > 120 ? "active" : "")}>
                <div className="container">
                    <div className="header-content">
                        <div className="header-logo" onClick={() => {
                            navigate('/');
                        }}>
                            <img
                                src={logo}
                                alt="logo"
                            />
                        </div>
                        <form onSubmit={handleSubmitSearchForm}>
                            <input
                                className={clsx(offset > 120 ? "focus" : "")}
                                type="text"
                                placeholder="Search Anything..."
                                onChange={handleInputChange}
                                value={inputValue}
                            />
                            <button type="submit"><span><BiSearch size={"1.1em"}/></span></button>
                        </form>
                        <div className="header-widget-group">
                            {
                                isLoggedIn &&
                                <div className="home-cart">
                                    <Tippy content={<span style={{fontSize: "12px"}}>Thông báo</span>}>
                                        <span><MdNotifications size={"1.2em"}/></span>
                                    </Tippy>
                                    <span>0</span>
                                </div>
                            }

                            <div className="home-cart heart-icon">
                                <span><BsFillSuitHeartFill size={"1em"}/></span>
                                <span>{favoriteItems?.length ? favoriteItems?.length : "0"}</span>
                                <ul className="dropdown-position-list favorite">
                                    <p>Your WishList :</p>
                                    {favoriteItems?.length ? (
                                        <>
                                            {favoriteItems.map((item) => (
                                                <li key={item.id}>
                                                    <img src={asset(item.thumb_image)} alt="img"/>
                                                    <p>{item.name}</p>
                                                    <span>{item.offer_price}</span>
                                                </li>
                                            ))}
                                            <div className='d-flex  justify-content-end'>
                                                <button className='btn btn-primary' onClick={() => (navigate('buyer/wishlist'))}>Go to wishlist</button>
                                            </div>
                                        </>
                                    ) : (
                                        <h5>Your WishList is Empty</h5>
                                    )}
                                </ul>
                            </div>
                            <div
                                className="home-cart d-flex"
                                onClick={() => handleShowCart()}
                            >
                                <Tippy content={<span style={{fontSize: "12px"}}>Cartlist</span>}>
                                    <span className={`text ${hover ? "hover" : ""}`}><FaShoppingCart
                                        size={"1em"}/></span>
                                </Tippy>
                                <span>{myCart?.length ? myCart?.length : 0}</span>
                                <div
                                    className="total-price"
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                >
                                    <p>Total Price</p>
                                    <small>US{total}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <NavbarTitle/>
        </>
    );
};

export default Header;
