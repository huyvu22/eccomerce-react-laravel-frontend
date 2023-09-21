import {Route} from "react-router-dom";
import CheckOut from "../pages/CheckOut/CheckOut";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import WishList from "../pages/WishList/WishList";
import UserProfile from "../pages/UserProfile/UserProfile";
import PaymentPayPalSuccess from "../pages/PaymentStatus/PaymentPayPalSuccess";
import Order from "../pages/Order/Order";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import VendorProfile from "../pages/Vendor/Profile/VendorProfile";
import AddProduct from "../pages/Vendor/Products/AddProduct/AddProduct";
import EditProduct from "../pages/Vendor/Products/EditProduct/EditProduct";
import OrderedProducts from "../pages/Vendor/OrderedProducts/OrderedProducts";
import SellerOrderDetail from "../pages/Vendor/OrderDetail/SellerOrderDetail";
import SellerMiddleware from "../middlewares/SellerMiddleware";
import ListProducts from "../pages/Vendor/Products/ListProducts/ListProducts";
import PaymentCODSuccess from "../pages/PaymentStatus/PaymentCODSuccess";
import PaymentVnPaySuccess from "../pages/PaymentStatus/PaymentVnPaySuccess";


export const protectRoutes = (
    <>
        <Route path="checkout" element={<AuthMiddleware/>}>
            <Route path="" element={<CheckOut/>}/>
        </Route>
        <Route path="buyer/my-profile" element={<AuthMiddleware/>}>
            <Route index element={<UserProfile/>}/>
        </Route>

        <Route path="buyer/wishlist" element={<AuthMiddleware/>}>
            <Route path="" element={<WishList/>}/>
        </Route>
        <Route path="payment/" element={<AuthMiddleware/>}>
            <Route path="paypal/success" element={<PaymentPayPalSuccess/>}/>
            <Route path="cod/success" element={<PaymentCODSuccess/>}/>
            <Route path="vnpay/success" element={<PaymentVnPaySuccess/>}/>
        </Route>
        <Route path="buyer/order" element={<AuthMiddleware/>}>
            <Route index element={<Order/>}/>
            <Route path=":id" element={<OrderDetail/>}/>
        </Route>

        <Route path="seller/my-profile" element={<SellerMiddleware/>}>
            <Route index element={<VendorProfile/>}/>
        </Route>
        <Route path="item/my-products" element={<SellerMiddleware/>}>
            <Route index element={<ListProducts/>}/>
        </Route>
        <Route path="item/products/add" element={<SellerMiddleware/>}>
            <Route path="" element={<AddProduct/>}/>
        </Route>
        <Route path="item/products/edit/:id/:slug" element={<SellerMiddleware/>}>
            <Route path="" element={<EditProduct/>}/>
        </Route>

        <Route path="seller/ordered_products" element={<SellerMiddleware/>}>
            <Route path="" element={<OrderedProducts/>}/>
            <Route path=":id" element={<SellerOrderDetail/>}/>
        </Route>

    </>
);
