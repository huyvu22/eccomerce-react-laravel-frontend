import React from 'react';
import './Intro.scss'
import {MdLocalShipping} from "react-icons/md";
import {FiRepeat} from "react-icons/fi";
import {MdOutlineSupportAgent} from "react-icons/md";
import {AiFillLock} from "react-icons/ai";

const Intro = () => {
    return (
        <section className="section intro-part">
            <div className="container">
                <div className="row intro-content">
                    <div className="col-sm-6 col-lg-3">
                        <div className="intro-wrapper">
                            <div className="intro-icon">
                                <span><MdLocalShipping/></span>
                            </div>
                            <div className="intro-content">
                                <p>free home delivery</p>
                                <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="intro-wrapper">
                            <div className="intro-icon">
                                <span><FiRepeat/></span>
                            </div>
                            <div className="intro-content">
                                <p>Instant Return Policy</p>
                                <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="intro-wrapper">
                            <div className="intro-icon">
                                <span><MdOutlineSupportAgent/></span>
                            </div>
                            <div className="intro-content">
                                <p>Quick Support System</p>
                                <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="intro-wrapper">
                            <div className="intro-icon">
                                <span><AiFillLock/></span>
                            </div>
                            <div className="intro-content">
                                <p>Secure Payment Way</p>
                                <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Intro;