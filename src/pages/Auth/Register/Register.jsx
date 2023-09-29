import React, {useState} from 'react';
import "./Register.scss";
import {AiOutlineGoogle} from "react-icons/ai";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import useClient from "../../../services/Hooks/useClient";
import logo from "../../../assets/images/logo.png";

const Register = () => {
    const client = useClient();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        description: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const location = useLocation();
    const isSellerRegister = location.pathname.includes("seller/register");

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleRegister = async () => {
        if (isSellerRegister === true) {

            const newFormData = new FormData();
            newFormData.append("name", formData.name);
            newFormData.append("email", formData.email);
            newFormData.append("phone", formData.phone);
            newFormData.append("password", formData.password);
            newFormData.append("password_confirmation", formData.password_confirmation);
            newFormData.append("address", formData.address);
            newFormData.append("image", selectedFile);
            newFormData.append("description", formData.description);

            // let res = await fetch("http://buynow.test/api/seller/register", {
            //     method: "POST",
            //     body: newFormData,
            // })
            //
            // const data = await res.json();
            //
            // if (res.ok) {
            //     toast('Register Successfully');
            // } else {
            //     toast(data.message);
            // }

            const res = await client.post('/seller/register', newFormData);
            const data = await res.data
            if (res.response.ok) {
                toast('Register Successfully');
            } else {
                toast(data.message);
            }
        } else {
            // let res = await fetch("http://buynow.test/api/register", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "accept": "application/json"
            //     },
            //     body: JSON.stringify({
            //         "name": formData.name,
            //         "email": formData.email,
            //         "password": formData.password,
            //         'password_confirmation': formData.password_confirmation
            //     })
            // })
            // const data = await res.json();
            // if (res.ok) {
            //     toast('Register Successfully');
            //     navigate('buyer/login')
            // } else {
            //     toast(data.message);
            // }

            const newFormData = {
                "name": formData.name,
                "email": formData.email,
                "password": formData.password,
                'password_confirmation': formData.password_confirmation
            }

            const res = await client.post('register', newFormData);
            const data = await res.data
            if (res.response.ok) {
                toast('Register Successfully');
                navigate('/buyer/login')
            } else {
                toast(data.message);
            }
        }
    }

    const handleLoginByGoogle = async () => {
        const res = await client.get('login/google');
        if (res.response.ok === true) {
            const data = await res.data;
            location.pathname.includes('/buyer/login') ? sessionStorage.setItem('buyer-google-login', 'true') : sessionStorage.setItem('buyer-google-login', 'false');
            window.location.href = data.url;
        }

    }
    return (
        <section className="form-register">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-12 col-lg-12 col-xl-8">
                        <div className="register-logo">
                            <Link to={"/"}>
                                <img
                                    src={logo}
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="register-form">
                            <div className="register-form-title">
                                <h3><b>Join now!</b></h3>
                                <p>Create A New Account In A Minute</p>
                            </div>
                            <div className="register-form-group">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Name: </label>
                                                <input type="text" name="name" className="form-control"
                                                       value={formData.name} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Email: </label>
                                                <input type="email" name="email" className="form-control"
                                                       value={formData.email} onChange={handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Password: </label>
                                                <input type="password" name="password" className="form-control"
                                                       value={formData.password} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Confirm Password: </label>
                                                <input type="password" name="password_confirmation"
                                                       value={formData.password_confirmation} className="form-control"
                                                       onChange={handleChange}/>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        isSellerRegister &&
                                        <>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Phone: </label>
                                                        <input type="text" name="phone" className="form-control"
                                                               value={formData.phone} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Banner: </label>
                                                        <input type="file" name="image" className="form-control"
                                                               onChange={(e) => handleFileChange(e)} accept="image/*"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="">Address: </label>
                                                        <textarea className="form-control" name="address" rows="3"
                                                                  value={formData.address} onChange={handleChange}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="">About me: </label>
                                                        <textarea className="form-control" name="description" rows="6"
                                                                  value={formData.description} onChange={handleChange}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }

                                    <div className="form-btn">
                                        <button type="button" onClick={handleRegister}>REGISTER</button>
                                        <button type="button" onClick={handleLoginByGoogle}><span><AiOutlineGoogle/></span>Login With
                                            Google
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="login">
                            <p>Don't Have Any Account? <Link to="/buyer/login">Login Here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;