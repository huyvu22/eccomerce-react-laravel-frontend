import {Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import ProductDetail from "../pages/Products/ProductDetail/ProductDetail";
import Products from "../pages/Products/Product/Products";
import PageNotFound from "../pages/404/PageNotFound";
import ListProducts from "../pages/Vendor/Products/ListProducts/ListProducts";
import FaqQuestion from "../pages/FaqQuestion/FaqQuestion";
import Contact from "../pages/Contact/Contact";

export const publicRoutes = (
    <>
        <Route path="/" element={<Home/>}/>
        <Route path="products/search/:keyword" element={<Products/>}/>
        <Route path="products/category/:slug" element={<Products/>}/>
        <Route path="products/sub-category/:slug" element={<Products/>}/>
        <Route path="item/products/deals/" element={<Products/>}/>
        <Route path="item/products/featured/" element={<Products/>}/>
        <Route path="item/products/latest/" element={<Products/>}/>
        <Route path="item/item_details/:id/:slug" element={<ProductDetail/>}/>
        <Route path="site/faq" element={<FaqQuestion/>}/>
        <Route path="contact-us" element={<Contact/>}/>
        <Route path="404" element={<PageNotFound/>}/>

    </>
);
