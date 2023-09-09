import './ForgotPass.scss';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineGoogle} from "react-icons/ai";
import {toast} from "react-toastify";
import {getCookie} from "../../../utils/dataHandler";

const ForgotPass = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: ""});
    const [validEmail, setValidEmail] = useState(true);
    const tokenLogin = getCookie('user_access_token') || getCookie('seller_access_token');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tokenLogin) {
            navigate('/')
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

    const handleLogin = async () => {
        const isValidEmail = validateEmail(formData.email);
        if (!isValidEmail) {
            setValidEmail(false);
            toast.error("Login Failed");
            return;
        } else {
            setValidEmail(true);
        }

        if (isValidEmail) {
            setLoading(true)
            let res = await fetch("http://buynow.test/api/forgot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    "email": formData.email,
                })
            })
            const data = await res.json();
            if (res.ok) {
                setLoading(false)
                toast.success(data.message);
                navigate('/buyer/login');
            } else {
                setLoading(false)
                toast.error(data.message);
            }
        }

    };
    return (
        <section>
            <div className="user-forgot">
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
                                    <h3><b>Worried!</b></h3>
                                    <p>No Problem! Just Follow The Simple Way</p>
                                </div>
                                <div className="forgot-form-group">
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
                                        </div>
                                        <div className="form-btn">
                                            <button type="button" onClick={handleLogin}>
                                                Submit {loading && <span className="dots-1">...</span>}
                                            </button>
                                            <button type="button"><span><AiOutlineGoogle/></span>
                                                Login With Google
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="register">
                                <p>Don't Have Any Account? <Link to="/buyer/register"> Register Here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPass;