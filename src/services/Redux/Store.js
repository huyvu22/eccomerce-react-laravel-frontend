import { configureStore } from "@reduxjs/toolkit";
import { CartReducer, LoginReducer } from "../../layouts/Header/HeaderSlice";
import { SearchReducer } from "../../layouts/Header/HeaderSlice";
import ProductCardReducer from "../../components/ProductCard/ProductCardSlice";
import cartDataReducer from "../../components/ShoppingCartSlide/ShoppingCartSlice";

export default configureStore({
  reducer: {
    cartItems: CartReducer,
    searchProducts: SearchReducer,
    loginUser: LoginReducer,
    productCard: ProductCardReducer,
    cartDataUsers: cartDataReducer,
  },
});
