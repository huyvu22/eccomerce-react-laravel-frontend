import React from 'react';
import SingleBanner from "../../../components/SingleBanner/SingleBanner";
import SinglePagePart from "../../../components/SinglePagePart/SinglePagePart";
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const Products = () => {
    const {slug, keyword} = useParams();
    const location = useLocation();
    let pageName = '';
    let name = '';
    const isCategory = location.pathname.includes('/products/category/');
    const isSubCategory = location.pathname.includes('/products/sub-category/');
    const isSearch = location.pathname.includes('/products/search/')
    const isBestDeals = location.pathname.includes('/products/deals/')
    const isFeatured = location.pathname.includes('/products/featured/')
    const isNewArrival = location.pathname.includes('/products/latest/')
    const isSellerProduct = location.pathname.includes('/products/seller/')
    const keywords = useSelector((state) => state.searchProducts.keywords) ?? null;
    const priceSpread = useSelector((state) => state.searchProducts.priceSpread) ?? null;

    let attributes = "";

    let searchParam = '';
    if (keywords !== '') {
        searchParam += `search=${keywords}`;
    }

    if (priceSpread.length) {
        searchParam += (searchParam ? '&' : '') + `price-range=${priceSpread}`;
    }

    if (isCategory) {
        attributes = searchParam ? `category/${slug}?${searchParam}` : `category/${slug}`;
        pageName = slug;
        name = slug;

    } else if (isSubCategory) {
        attributes = searchParam ? `sub-category/${slug}?${searchParam}` : `sub-category/${slug}`;
        pageName = slug;
        name = slug;

    } else if (isSearch) {
        attributes = `search/${keyword}`;
        pageName = 'Search Result';
        name = 'Search Result';

    } else if (isBestDeals) {
        attributes = searchParam ? `product-type/best_product?${searchParam}` : `product-type/best_product`;
        pageName = 'Best Deals';
        name = 'Best Deals';

    } else if (isFeatured) {
        attributes = searchParam ? `product-type/featured?${searchParam}` : `product-type/featured`;
        pageName = 'Featured';
        name = 'Featured';

    } else if (isNewArrival) {
        attributes = searchParam ? `product-type/new_arrival?${searchParam}` : `product-type/new_arrival`;
        pageName = 'New Arrival';
        name = 'New Arrival';
    } else if (isSellerProduct) {
        // attributes = searchParam ? `product-type/new_arrival?${searchParam}` : `product-type/new_arrival`;
        // pageName = 'New Arrival';
        // name = 'New Arrival';
    }


    return (
        <>
            <SingleBanner name={name}/>
            <SinglePagePart pageName={pageName} attributes={attributes}/>
        </>
    );
};

export default Products;