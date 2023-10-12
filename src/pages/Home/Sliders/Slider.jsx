import React, {useEffect, useState} from 'react';
import './Slider.scss'
import AOS from 'aos';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/bundle";
import {Pagination, Navigation, Autoplay} from "swiper";
import "swiper/css/pagination";
import {FaShoppingCart} from "react-icons/fa";
import {asset} from "../../../services/Helpers/Image/image";
import useClient from "../../../services/Hooks/useClient";

const Slider = () => {
    const [sliders, setSliders] = useState([]);
    const client = useClient();
    const getSlider = async () => {
        const res = await client.get('sliders');
        if (res.response.ok) {
            const data = await res.data.data;
            setSliders(data);
        }

    }
    useEffect(() => {
        getSlider();
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 100000
        });
    }, []);
    return (
        <div className="container-md" data-aos="fade-in">
            <div className="row">
                <div className="col-12">
                    <div className="swiper sliderFeaturedPosts">
                        <Swiper
                            style={{
                                "--swiper-pagination-color": "#411900",
                                "--swiper-pagination-bullet-inactive-color": "#999999",
                                "--swiper-pagination-bullet-inactive-opacity": "1",
                                "--swiper-pagination-bullet-size": "12px",
                                "--swiper-pagination-bullet-horizontal-gap": "6px"
                            }}
                            speed={500}
                            centeredSlides={true}
                            autoplay={{
                                delay: 1010101010,
                                disableOnInteraction: false,
                            }}
                            // spaceBetween={30}
                            loop={true}
                            pagination={{
                                el: ".swiper-pagination",
                                clickable: true,
                            }}
                            navigation={{
                                nextEl: ".custom-swiper-button-next",
                                prevEl: ".custom-swiper-button-prev",
                            }}
                            modules={[Autoplay, Pagination, Navigation]}
                        >
                            <div className="swiper-wrapper">
                                {sliders.length > 0 && sliders.map((slider, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-md-6 col-lg-6">
                                            <SwiperSlide>
                                                <div className="swiper-slide">
                                                    <span><img src={asset(slider.banner)} alt="img"/></span>
                                                    <div className="banner-content">
                                                        <h2>{slider.title}</h2>
                                                        <a href={slider.btn_url} className="btn btn-inline">
                                                            <span><FaShoppingCart/></span>
                                                            <span>shop now</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </div>
                                    </div>
                                ))}


                            </div>
                            <div className="custom-swiper-button-next" style={{cursor: 'pointer'}}>
                                <span className="bi-chevron-right"/>
                            </div>
                            <div className="custom-swiper-button-prev" style={{cursor: 'pointer'}}>
                                <span className="bi-chevron-left"/>
                            </div>
                            <div className="swiper-pagination"/>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider;