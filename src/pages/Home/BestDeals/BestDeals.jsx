import React, {useEffect, useState} from "react";
import "./BestDeals.scss";
import {FaEye} from "react-icons/fa";
import ProductCard from "../../../components/ProductCard/ProductCard";
import useFetchData from "../../../services/Hooks/useFetchData";
import {Link,} from "react-router-dom";
import {processFetchedData} from "../../../utils/dataHandler";
import {useSelector} from "react-redux";
import useMyCart from "../../../services/Hooks/useMyCart";
import Skeleton from "react-loading-skeleton";

const BestDeals = (props) => {
    const {data} = useFetchData("products", "product-type/best_product");
    const [myCart] = useMyCart();
    const compareItems = useSelector((state) => state.productCard.compareList);

    let showData = processFetchedData(data, props?.wishList, myCart, compareItems);

    return (
        <>
            {
                !showData?.length ?
                    <section className="deals-part">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-heading">
                                        <h2>Best Deals</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                                {[...Array(8).keys()].map((index) => (
                                    <div className="col" key={index}>
                                        <div className="product-card">
                                            <Skeleton height={300}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section> :
                    <section className="deals-part">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-heading">
                                        <h2>Best Deals</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                                {showData.splice(0, 8)?.map((item) => (
                                    <ProductCard key={item.id} item={item} {...props} />
                                ))}
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="view-all d-flex justify-content-center">
                                        <Link to="/item/products/deals/" className="btn btn-inline">
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

export default BestDeals;
