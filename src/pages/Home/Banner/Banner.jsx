import React, {useEffect, useState} from 'react';
import './Banner.scss';
import {HiOutlineViewList} from "react-icons/hi";
import {FaArrowRight} from "react-icons/fa";
import {MdKeyboardArrowRight} from "react-icons/md";
import CategoryItem from "./Categories/CategoryItem";
// import Slider from "../../pages/Home/Sliders/Slider";
import PromoImage1 from "../../../assets/images/banner01.jpg";
import PromoImage2 from "../../../assets/images/banner01.jpg";
import Slider from "../Sliders/Slider";

const Banner = () => {

    return (
        <section className="banner-part">
            <div className="container">
                <div className="row">
                    <CategoryItem/>

                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="slider mb-5">
                                    <Slider/>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6">
                                <div className="banner-promo">
                                    <span><img src={PromoImage1} alt="img"/></span>
                                </div>

                            </div>
                            <div className="col-md-6 col-lg-6">
                                <div className="banner-promo">
                                    <span><img src={PromoImage2} alt="img"/></span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Banner;