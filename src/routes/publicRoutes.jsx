import {Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import ProductDetail from "../pages/Products/ProductDetail/ProductDetail";
import Products from "../pages/Products/Product/Products";
import PageNotFound from "../pages/404/PageNotFound";
import FaqQuestion from "../pages/FaqQuestion/FaqQuestion";
import Contact from "../pages/Contact/Contact";
import React from "react";
import AboutUs from "../pages/AboutUs/AboutUs";
import TermsAndCondition from "../pages/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import GoogleCallback from "../pages/Auth/GoogleCallback/GoogleCallback";

export const publicRoutes = (
    <>
        <Route path="/" element={<Home/>}/>
        <Route path="login/google/callback" element={<GoogleCallback/>}/>
        <Route path="products/search/:keyword" element={<Products/>}/>
        <Route path="products/category/:slug" element={<Products/>}/>
        <Route path="products/sub-category/:slug" element={<Products/>}/>
        <Route path="item/products/deals/" element={<Products/>}/>
        <Route path="item/products/featured/" element={<Products/>}/>
        <Route path="item/products/latest/" element={<Products/>}/>
        <Route path="item/products/seller/:id/:slug" element={<Products/>}/>
        <Route path="item/item_details/:id/:slug" element={<ProductDetail/>}/>
        <Route path="site/faq" element={<FaqQuestion/>}/>
        <Route path="contact-us" element={<Contact/>}/>
        <Route path="about-us" element={<AboutUs/>}/>
        <Route path="terms-and-condition" element={<TermsAndCondition/>}/>
        <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="404" element={<PageNotFound/>}/>

    </>
);
