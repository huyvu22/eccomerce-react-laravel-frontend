import {configureStore} from "@reduxjs/toolkit";
import {CartReducer, LoginReducer} from "../../layouts/Header/HeaderSlice";
import {SearchReducer} from "../../layouts/Header/HeaderSlice";
import ProductCardReducer from "../../components/ProductCard/ProductCardSlice";
import cartDataReducer from "../../components/ShoppingCartSlide/ShoppingCartSlice";
import {ModalLoginReducer} from "../../components/Modal/ModalLogin/ModalLoginSlice";


export default configureStore({
    reducer: {
        cartItems: CartReducer,
        searchProducts: SearchReducer,
        loginUser: LoginReducer,
        productCard: ProductCardReducer,
        cartDataUsers: cartDataReducer,
        modalLogin: ModalLoginReducer,
    },
});
