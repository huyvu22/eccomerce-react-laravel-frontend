import React, {useEffect} from 'react';
import './NewItems.scss';
import ProductCard from "../../../components/ProductCard/ProductCard";
import Slider from "react-slick";
import {HiArrowSmRight} from "react-icons/hi";
import {HiArrowSmLeft} from "react-icons/hi";
import {FaEye} from "react-icons/fa";
import useFetchData from "../../../services/Hooks/useFetchData";
import {Link} from "react-router-dom";
import {processFetchedData} from "../../../utils/dataHandler";
import {useSelector} from "react-redux";
import useMyCart from "../../../services/Hooks/useMyCart";
import Skeleton from "react-loading-skeleton";

const NewItems = () => {
    const {data, loading} = useFetchData("products", "product-type/new_arrival");
    const favoriteItems = useSelector((state) => state.productCard.wishList);
    const compareItems = useSelector((state) => state.productCard.compareList);
    const [myCart] = useMyCart();

    const showData = processFetchedData(data, favoriteItems, myCart, compareItems);

    const ArrowLeft = ({currentSlide, slideCount, ...props}) => (
        <button
            {...props}
            className={'prev'}><span><HiArrowSmLeft size="1.5em"/></span></button>
    );
    const ArrowRight = ({currentSlide, slideCount, ...props}) => (
        <button
            {...props}
            className={'next'}><span><HiArrowSmRight size="1.5em"/></span></button>
    );
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: <ArrowLeft/>,
        nextArrow: <ArrowRight/>,
        responsive: [
            {
                breakpoint: 1398,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
        <>
            {
                !showData?.length ?
                    <section className="new-item-part">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="section-heading">
                                        <h2>collected new items</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="section-items">
                                        <div className="wrapper">
                                            {[...Array(6).keys()].map((index) => (
                                                <div className="product-card" key={index}>
                                                    <Skeleton height={200} width={170}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section> :
                    <section className="new-item-part">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="section-heading">
                                        <h2>collected new items</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="section-items">
                                        <Slider {...settings}>
                                            {
                                                showData?.map(item => <ProductCard key={item.id} item={item}/>)
                                            }
                                        </Slider>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="view-all d-flex justify-content-center">
                                        <Link to="/item/products/latest/" className="btn btn-inline">
                                            <span className="me-2"><FaEye/></span>
                                            <span>view all</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }
        </>

    );
};

export default NewItems;