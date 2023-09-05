import React from 'react';
import './FeaturedItems.scss';
import {FaEye} from "react-icons/fa";
import useFetchData from "../../../services/Hooks/useFetchData";
import FeatureCard from "../../../components/FeatureCard/FeatureCard";
import {Link} from "react-router-dom";
import {shuffleArray} from "../../../services/Helpers/Number/Number";
import {useSelector} from "react-redux";
import useMyCart from "../../../services/Hooks/useMyCart";
import {processFetchedData} from "../../../utils/dataHandler";

let newData = [];
const FeaturedItems = () => {
    const {data, loading} = useFetchData("products", "product-type/featured")
    const favoriteItems = useSelector((state) => state.productCard.wishList);
    const compareItems = useSelector((state) => state.productCard.compareList);
    const [myCart] = useMyCart();

    if (!data?.length) {
        return null
    }

    const showData = (processFetchedData(data, favoriteItems, myCart, compareItems)).slice(0, 4);


    return (
        <section className="feature-part">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-heading">
                            <h2>featured items</h2>
                        </div>
                    </div>
                </div>
                {
                    loading === true
                        ?
                        <div className="loading">
                            <h3>Loading...</h3>
                        </div>
                        :
                        <>
                            <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
                                {
                                    showData?.map((item) => <FeatureCard key={item.id} item={item}/>)
                                }
                            </div>
                        </>
                }
                <div className="row">
                    <div className="col-12">
                        <div className="view-all d-flex justify-content-center mt-5">
                            <Link to="/item/products/featured/" className="btn btn-inline">
                                <span className="me-2"><FaEye/></span>
                                <span>view all</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedItems;