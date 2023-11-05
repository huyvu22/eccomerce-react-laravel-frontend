import React, {useEffect, useState} from "react";
import './Login.scss';
import {AiOutlineGoogle} from "react-icons/ai";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {login, logout} from "../../../layouts/Header/HeaderSlice";
import {resetCart} from "../../../components/ProductCard/ProductCardSlice";
import useClient from "../../../services/Hooks/useClient";
import {generateRandomToken} from "../../../services/Helpers/Number/Number";
import {deleteCookie, getCookie, setCookie} from "../../../utils/dataHandler";
import logo from "../../../assets/images/logo.png";

const Login = () => {
    const client = useClient();
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: location.pathname.includes('buyer/login') ? "nam@gmail.com" : "seller2@gmail.com", password: "12345678"});
    const [token, setToken] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();
    const tokenUserLogin = getCookie('user_access_token');
    const tokenSellerLogin = getCookie('seller_access_token');
    const isBuyer = location.pathname.includes('buyer/login');

    useEffect(() => {
        if ((tokenUserLogin && location.pathname.includes('buyer/login')) || (tokenSellerLogin && location.pathname.includes('seller/login'))) {
            navigate('/');
        }
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleOldLogin = () => {
        if ((tokenUserLogin && location.pathname.includes('/seller/login')) || (tokenSellerLogin && location.pathname.includes('/buyer/login'))) {
            dispatch(logout());
            dispatch(resetCart());
            deleteCookie('user_access_token');
            deleteCookie('seller_access_token');
            deleteCookie('remember_token');
        }
    }

    const handleLogin = async () => {

        // Validate form
        const isValidEmail = validateEmail(formData.email);
        if (!isValidEmail) {
            setValidEmail(false);
            toast.error("Login Failed");
            return;
        } else {
            setValidEmail(true);
        }

        if (!formData.password) {
            setValidPassword(false);
            toast.error("Login Failed");
            return;
        } else {
            setValidPassword(true);
        }

        // Call Api
        if (isValidEmail && formData?.password) {
            let res = await client.post('login', formData)
            if (rememberMe) {
                let rememberMeToken = generateRandomToken(32);
                res = await client.post('login', {"email": formData.email, "password": formData.password}, {'remember_token': rememberMeToken})
                setCookie('remember_token', rememberMeToken, 30)
            }
            const userData = await res.data;
            if (res.response.ok === true) {
                handleOldLogin();
                let tokenLogin = userData.data.token
                setToken(tokenLogin);
                const storageItem = location.pathname.includes('/buyer/login')
                    ? 'user_access_token'
                    : 'seller_access_token';

                if (storageItem) {
                    if (rememberMe) {
                        setCookie(storageItem, tokenLogin, 30)
                    } else {
                        setCookie(storageItem, tokenLogin)
                    }

                    dispatch(login(storageItem));
                }
                toast('Login Successful');
                navigate('/');
            } else {
                toast(userData.message);
            }
        }
    };

    const handleLoginByGoogle = async () => {
        const res = await client.get('login/google');
        if (res.response.ok === true) {
            const data = await res.data;
            location.pathname.includes('/buyer/login') ? sessionStorage.setItem('buyer-google-login', 'true') : sessionStorage.setItem('buyer-google-login', 'false');
            window.location.href = data.url;
        }
    }

    return (
        <section>
            <div className="user-login">
                <div className="container">
                    <div className="row justify-content-center ">
                        <div className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6">
                            <div className="login-logo">
                                <Link to={"/"}>
                                    <img
                                        src={logo}
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                            <div className="login-form">
                                <div className="login-form-title">
                                    <h3><b>Welcome!</b></h3>
                                    <p>Use Your Credentials To Access</p>
                                </div>
                                <div className="login-form-group">
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group ">
                                                    <label htmlFor="">Email: </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className={`form-control ${validEmail ? 'valid' : 'invalid'}`}
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        defaultValue="nam@gmail.com"
                                                    />
                                                    {!validEmail && <div className='feedback'><span>Please provide a valid email. </span></div>}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="">Password: </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className={`form-control ${validPassword ? '' : 'invalid'}`}
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
                                                    {!validPassword && <div className='feedback'><span>Please provide a valid password. </span></div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rememberMe">
                                            <input type="checkbox" className=".form-check-input" onChange={(e) => setRememberMe(e.target.checked)}/>
                                            <label htmlFor="">Remember Me</label>
                                        </div>
                                        <div className="form-btn">
                                            <button type="button" onClick={handleLogin}>
                                                Login
                                            </button>
                                            <button type="button" onClick={handleLoginByGoogle}><span><AiOutlineGoogle/></span>
                                                Login With Google
                                            </button>
                                        </div>
                                    </form>
                                    <p>
                                        Forgot Your Password? <Link to="/buyer/forgot">Reset Here</Link>
                                    </p>
                                </div>
                            </div>
                            <div className="register">
                                <p>Don't Have Any Account? <Link to={isBuyer ? "/buyer/register" : "/seller/register"}>Register Here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
