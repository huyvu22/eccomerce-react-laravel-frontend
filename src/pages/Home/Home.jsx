import React, {useEffect, useState} from 'react';
import Banner from "./Banner/Banner";
import Intro from "./Introduction/Intro";
import BestDeals from "./BestDeals/BestDeals";
import FeaturedItems from "./FeaturedItems/FeaturedItems";
import Promotion from "./Promotion/Promotion";
import NewItems from "./NewItems/NewItems";
import ModalPreviewItem from "../../components/ModalPreviewItem/ModalPreviewItem";
import {useLocation} from "react-router-dom";
import {useDispatch,} from "react-redux";
import {clearAll} from "../../layouts/Header/HeaderSlice";
import NewsLetter from "./NewsLetter/NewsLetter";


const Home = () => {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();


    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(clearAll());
        }
    }, [location.pathname, dispatch]);

    return (
        <>
            <Banner/>
            <Intro/>
            <BestDeals setModalShow={setModalShow}/>
            <FeaturedItems/>
            <Promotion/>
            <NewItems/>
            <NewsLetter/>
            <ModalPreviewItem show={modalShow}
                              onHide={() => setModalShow(false)}/>
        </>
    );
};

export default Home;