import React from 'react';
import './Footer.scss'
import logo from "../../assets/images/logo.png";
import {MdAlternateEmail} from "react-icons/md";
import {BsPhone} from "react-icons/bs";
import {ImLocation} from "react-icons/im";

const Footer = () => {
    return (
        <>
            <div className="footer-part">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-xl-3">
                            <div className="footer-widget">
                                <a className='footer-logo' href="">
                                    <img src={logo} alt=""/>
                                </a>
                                <p className="footer-desc">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ....
                                    <a href="">Read more</a>
                                </p>
                                <ul className='footer-social'>
                                    <li><a className='icofont-facebook' href=""></a></li>
                                    <li><a className='icofont-facebook' href=""></a></li>
                                    <li><a className='icofont-facebook' href=""></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="footer-widget contact">
                                <h4>Contact</h4>
                                <ul className="footer-contact">
                                    <li>
                                        <p><span className='pe-2' style={{color: "var(--text-primary)"}}><MdAlternateEmail size={"2em"}/></span>sales@yourcompany.com</p>
                                    </li>
                                    <li>
                                        <i className="icofont-ui-touch-phone"></i>
                                        <p><span className='pe-2' style={{color: "var(--text-primary)"}}><BsPhone size={"2em"}/></span><span>+91-9876543210</span></p>
                                    </li>
                                    <li>
                                        <i className="icofont-location-pin"></i>
                                        <p><span className='pe-2' style={{color: "var(--text-primary)"}}><ImLocation size={"2em"}/></span>Bengal Eco Intelligent Park, EM Block,
                                            Sector V, Saltlake, Kolkata 700091
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="footer-widget">
                                <h4>quick Links</h4>
                                <div className="footer-links">
                                    <ul className="footer-contact">
                                        <li>
                                            <a href="">About Us</a>
                                        </li>
                                        <li>
                                            <a href="">Expiry date</a>
                                        </li>
                                        <li>
                                            <a href="">Best Deals</a>
                                        </li>
                                        <li>
                                            <a href="">Featured Items</a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="footer-widget">
                                <h4>top categories</h4>
                                <div className="footer-links">
                                    <ul className="footer-contact">
                                        <li>
                                            <a href="">Office chair</a>
                                        </li>
                                        <li>
                                            <a href="">Food container</a>
                                        </li>
                                        <li>
                                            <a href="">Office table</a>
                                        </li>
                                        <li>
                                            <a href="">Office electronics</a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;