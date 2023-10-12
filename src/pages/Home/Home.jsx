import React, {useEffect, useState} from 'react';
import Banner from "./Banner/Banner";
import Intro from "./Introduction/Intro";
import BestDeals from "./BestDeals/BestDeals";
import FeaturedItems from "./FeaturedItems/FeaturedItems";
import Promotion from "./Promotion/Promotion";
import NewItems from "./NewItems/NewItems";
import ModalPreviewItem from "../../components/ModalPreviewItem/ModalPreviewItem";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector,} from "react-redux";
import {clearAll} from "../../layouts/Header/HeaderSlice";
import NewsLetter from "./NewsLetter/NewsLetter";
import {getCookie} from "../../utils/dataHandler";
import useClient from "../../services/Hooks/useClient";

const Home = () => {
    const client = useClient();
    const userToken = getCookie('user_access_token') || getCookie('seller_access_token');
    const [modalShow, setModalShow] = useState(false);
    const favoriteItems = useSelector((state) => state.productCard.wishList);
    const [wishList, setWishList] = useState([])
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const element = document.documentElement || document.body;
        element.scrollIntoView({behavior: "smooth", block: "start"});
    }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(clearAll());
        }
    }, [location.pathname, dispatch]);

    const getUserWishList = async () => {
        const res = await client.get('wishlist', '', userToken);
        if (res.response.ok === true) {
            const dataObj = await res.data;
            setWishList(dataObj.data)
        }
    }

    useEffect(() => {
        getUserWishList()
    }, [favoriteItems]);


    return (
        <>
            <Banner/>
            <Intro/>
            <BestDeals setModalShow={setModalShow} wishList={wishList}/>
            <FeaturedItems wishList={wishList}/>
            <Promotion wishList={wishList}/>
            <NewItems wishList={wishList}/>
            <NewsLetter/>
            <ModalPreviewItem show={modalShow}
                              onHide={() => setModalShow(false)}/>
        </>
    );
};

export default Home;