import React, {useEffect, useState} from "react";
import './Login.scss';
import {AiOutlineGoogle} from "react-icons/ai";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {login, logout} from "../../../layouts/Header/HeaderSlice";
import {resetCart} from "../../../components/ProductCard/ProductCardSlice";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: "", password: ""});
    const [token, setToken] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const dispatch = useDispatch();
    const tokenUserLogin = localStorage.getItem('userToken')
    const tokenSellerLogin = localStorage.getItem('sellerToken')
    const location = useLocation();

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
        }
    }


    const handleLogin = async () => {
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

        if (isValidEmail && formData.password) {
            let res = await fetch("http://buynow.test/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    "email": formData.email,
                    "password": formData.password
                })
            })
            const data = await res.json();
            if (res.ok) {
                handleOldLogin();
                let tokenLogin = data.data.token
                setToken(tokenLogin);
                const storageItem = location.pathname.includes('/buyer/login')
                    ? 'userToken'
                    : 'sellerToken';

                if (storageItem) {
                    localStorage.setItem(storageItem, JSON.stringify({'token': tokenLogin}));
                    dispatch(login(storageItem));
                }
                toast('Login Successful');
                navigate('/');
            } else {
                toast(data.message);
            }
        }

    };

    return (
        <section>
            <div className="user-login">
                <div className="container">
                    <div className="row justify-content-center ">
                        <div className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6">
                            <div className="login-logo">
                                <Link to={"/"}>
                                    <img
                                        src="https://ready-music-store.itechscripts.com/assets/site_data/logo.png"
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
                                                        className={`form-control ${validEmail === true ? 'valid' : 'invalid'}`}
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
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
                                            <input type="checkbox" className=".form-check-input"/>
                                            <label htmlFor="">Remember Me</label>
                                        </div>
                                        <div className="form-btn">
                                            <button type="button" onClick={handleLogin}>
                                                Login
                                            </button>
                                            <button type="button"><span><AiOutlineGoogle/></span>
                                                Login With Google
                                            </button>
                                        </div>
                                    </form>
                                    <p>
                                        Forgot Your Password? <a href="/buyer/forgot">Reset Here</a>
                                    </p>
                                </div>
                            </div>
                            <div className="register">
                                <p>Don't Have Any Account? <Link to="/buyer/register">Register Here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
