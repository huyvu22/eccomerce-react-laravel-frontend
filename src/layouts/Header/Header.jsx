import "./Header.scss";
import React, {useState, useEffect, useRef, useCallback, useMemo} from "react";
import {Link, useNavigate} from "react-router-dom";
import {BiSearch} from "react-icons/bi";
import {BsFillSuitHeartFill} from "react-icons/bs";
import {FaShoppingCart} from "react-icons/fa";
import {MdNotifications} from "react-icons/md";
import {MdClose} from "react-icons/md";
import NavbarTitle from "./Navbar/NavbarTitle";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {onFocus, showCart, updateKeywords} from "./HeaderSlice";
import Tippy from "@tippyjs/react";
import useMyCart from "../../services/Hooks/useMyCart";
import logo from "../../assets/images/logo.png";
import debounce from 'lodash/debounce';
import {asset} from "../../services/Helpers/Image/image";
import button from "bootstrap/js/src/button";
import {useSubTotalPrice} from "../../services/Hooks/useTotalPrice";
import {getCookie} from "../../utils/dataHandler";
import useClient from "../../services/Hooks/useClient";
import PerfectScrollbar from 'react-perfect-scrollbar'
import {showDetail} from "../../components/ProductCard/ProductCardSlice";
import MobileMenu from "./Navbar/MobileMenu";

const Header = ({searchRef, formRef, handleClose}) => {
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);
    const [offset, setOffset] = useState(0);
    const [myCart] = useMyCart();
    const [wishList, setWishList] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [suggestionSearch, setSuggestionSearch] = useState([])
    const [passedPlaceholder, setPassedPlaceholder] = useState('Search products...')
    const [placeholder, setPlaceholder] = useState(passedPlaceholder.slice(0, 0));
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [forward, setForward] = useState(true);
    const [iconClose, setIconClose] = useState(true);
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const favoriteItems = useSelector((state) => state.productCard.wishList);
    const navigate = useNavigate();
    const client = useClient();
    const total = useSubTotalPrice();

    useEffect(() => {
        const interval = setInterval(() => {
            if (forward) {
                setPlaceholder(passedPlaceholder.slice(0, placeholderIndex + 1));
                if (placeholderIndex + 1 >= passedPlaceholder.length) {
                    setForward(false);
                } else {
                    setPlaceholderIndex(placeholderIndex + 1);
                }
            } else {
                setPlaceholder(passedPlaceholder.slice(0, placeholderIndex));
                if (placeholderIndex <= 0) {
                    setForward(true);
                    passedPlaceholder === 'Search products...' ? setPassedPlaceholder('Search brands...') : setPassedPlaceholder('Search products...');
                } else {
                    setPlaceholderIndex(placeholderIndex - 1);
                }
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };

    }, [placeholder, forward, placeholderIndex]);


    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);
        // clean up code
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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

    const handleOnFocus = () => {
        dispatch(onFocus(true));
        document.body.style.overflow = "hidden"
        formRef.current.style.zIndex = 11;
        if (suggestionSearch.length) {
            searchRef.current.style.display = 'block';
        }
    }

    const handleSuggestSearch = useCallback(async (value) => {
        if (value) {
            let res = await client.get(`products/search/${value}`);
            if (res.response.ok) {
                const dataObj = await res.data;
                setSuggestionSearch(dataObj.data)
                if (dataObj.data) {
                    searchRef.current.style.display = 'block';
                }
            }
        } else {
            searchRef.current.style.display = 'none';
        }
    }, []);


    const debouncedHandleSuggestSearch = useMemo(() => {
        return debounce(handleSuggestSearch, 300);
    }, [handleSuggestSearch]);

    const handleInputChange = (event) => {
        const newInputValue = event.target.value;
        setInputValue(newInputValue);

        if (newInputValue.trim() === '') {
            searchRef.current.style.display = 'none';
            setSuggestionSearch([])
        }

        debouncedHandleSuggestSearch(newInputValue);
    };

    const handleSubmitSearchForm = (e) => {
        e.preventDefault();
        const trimmedInputValue = inputValue.trim();
        handleClose()

        if (trimmedInputValue !== "") {
            dispatch(updateKeywords(trimmedInputValue));
            navigate(`/products/search/${trimmedInputValue}`);
            handleClose()
            setSuggestionSearch([])
        }
    };

    const handleClickItem = (e, item) => {
        e.preventDefault();
        dispatch(showDetail(item));
        navigate(`/item/item_details/${item.id}/${item.slug}`)
        handleClose()
        setSuggestionSearch([])
    }

    const handleShowSearch = () => {
        const form = formRef.current;

        if (form.style.display === "none" || form.style.display === "") {
            form.style.display = "block";
            setIconClose(false)
        } else {
            form.style.display = "none";
            setIconClose(true)
        }
    };

    return (
        <>
            <header className={clsx("header-part", offset > 120 ? "active" : "")}>
                <div className="container">
                    <div className="header-content">
                        <div className="header-media-group">
                            <div className="header-logo" onClick={() => {
                                navigate('/');
                            }}>
                                <img
                                    src={logo}
                                    alt="logo"
                                />
                            </div>
                            <div className="header-search" onClick={handleShowSearch}>
                                <span className={clsx('', !iconClose ? 'active-close' : '')}>{!iconClose ? <MdClose/> : <BiSearch/>}</span>
                            </div>
                        </div>
                        <form onSubmit={handleSubmitSearchForm} ref={formRef}>
                            <input
                                className={clsx(offset > 120 ? "focus" : "")}
                                type="text"
                                placeholder={placeholder}
                                onChange={handleInputChange}
                                value={inputValue}
                                onFocus={handleOnFocus}
                            />
                            <button type="submit"><span><BiSearch size={"1.1em"}/></span></button>

                            <div className={clsx("search-suggestion", suggestionSearch.length === 0 && "not-found")} ref={searchRef}>
                                {suggestionSearch?.length ? (
                                    <>
                                        <PerfectScrollbar>
                                            {suggestionSearch.map((item) => (
                                                <div
                                                    className="search-suggestion-item"
                                                    key={item.id}
                                                    onClick={(e) => handleClickItem(e, item)}
                                                >
                                                    <table>
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <a href="">
                                                                    <img src={asset(item.thumb_image)} alt="img"/>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <a href="">{item.name}</a>
                                                                <br/>
                                                                <p>
                                                                    Price: {item.offer_price}$ <del> {item.price}$</del>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ))}
                                        </PerfectScrollbar>
                                    </>
                                ) : (
                                    <div className="search-suggestion-item">
                                        <h5>Not Found Product</h5>
                                    </div>
                                )}
                            </div>
                        </form>
                        <div className="header-widget-group">
                            {
                                userToken &&
                                <div className="home-cart">
                                    <Tippy content={<span style={{fontSize: "12px"}}>Thông báo</span>}>
                                        <span><MdNotifications size={"1.2em"}/></span>
                                    </Tippy>
                                    <span>0</span>
                                </div>
                            }

                            <div className="home-cart heart-icon">
                                <span><BsFillSuitHeartFill size={"1em"}/></span>
                                <span>{wishList?.length ?? wishList.length}</span>
                                <ul className="dropdown-position-list favorite">
                                    <p>Your WishList :</p>
                                    {wishList?.length ? (
                                        <>
                                            {wishList.map((item) => (
                                                <li key={item.id} onClick={(e) => handleClickItem(e, item)}>
                                                    <img src={asset(item.thumb_image)} alt="img"/>
                                                    <p>{item.name}</p>
                                                    <span>{item.offer_price}$  <del>{item.price}$</del></span>
                                                </li>
                                            ))}
                                            <div className='wishlist-btn'>
                                                <button onClick={() => (navigate('buyer/wishlist'))}>Go to wishlist</button>
                                            </div>
                                        </>
                                    ) : (
                                        <h5 className="text-center">WishList is Empty</h5>
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
                                <span>{myCart?.length ?? 0}</span>
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
            <MobileMenu/>
        </>
    );
};

export default Header;
