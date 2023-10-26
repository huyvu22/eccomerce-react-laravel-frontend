import React, {useState} from 'react';
import './Banner.scss';
import CategoryItem from "./Categories/CategoryItem";
import PromoImage1 from "../../../assets/images/banner01.jpg";
import PromoImage2 from "../../../assets/images/banner02.jpg";
import Slider from "../Sliders/Slider";
import Skeleton from "react-loading-skeleton";

const Banner = () => {
    const [loading, setLoading] = useState(false)
    return (
        <>
            {
                loading ?
                    <section className="banner-part">
                        <div className="container">
                            <div className="row">
                                <CategoryItem loading={loading}/>
                                <div className="col-lg-9">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="slide">
                                                <Slider setLoading={setLoading} loading={loading}/>
                                                <Skeleton height={300}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <div className="banner-promo">
                                                <Skeleton height={100}/>
                                            </div>

                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <div className="banner-promo">
                                                <Skeleton height={100}/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </section> :
                    <section className="banner-part">
                        <div className="container">
                            <div className="row">

                                <CategoryItem loading={loading}/>

                                <div className="col-lg-9">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="slide">
                                                <Slider setLoading={setLoading} loading={loading}/>
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
            }
        </>

    );
};

export default Banner;