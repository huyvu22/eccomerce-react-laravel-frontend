import React from 'react';
import './FeaturedItems.scss';
import {FaEye} from "react-icons/fa";
import useFetchData from "../../../services/Hooks/useFetchData";
import FeatureCard from "../../../components/FeatureCard/FeatureCard";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import useMyCart from "../../../services/Hooks/useMyCart";
import {processFetchedData} from "../../../utils/dataHandler";
import Skeleton from "react-loading-skeleton";

const FeaturedItems = (props) => {
    const {data} = useFetchData("products", "product-type/featured")
    const compareItems = useSelector((state) => state.productCard.compareList);
    const [myCart] = useMyCart();

    let showData = processFetchedData(data, props?.wishList, myCart, compareItems);

    return (
        <>
            {
                !showData?.length ?
                    <section className="feature-part">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-heading">
                                        <h2>featured items</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
                                {[...Array(6).keys()].map((index) => (
                                    <div className="col" key={index}>
                                        <div className="product-card">
                                            <Skeleton height={300}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section> :
                    <section className="feature-part">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-heading">
                                        <h2>featured items</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
                                {
                                    showData.splice(0, 6)?.map((item) => <FeatureCard key={item.id} item={item} {...props}/>)
                                }
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="view-all d-flex justify-content-center">
                                        <Link to="/item/products/featured/" className="btn btn-inline">
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

export default FeaturedItems;