import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {getCookie} from "../../utils/dataHandler";

export const cartSlice = createSlice({
    name: "cartSidebar",
    initialState: {
        isShow: false,
    },
    reducers: {
        showCart: (state, action) => {
            state.isShow = true;
        },
        hideCart: (state, action) => {
            state.isShow = false;
        },
    },
});

export const searchSlice = createSlice({
    name: "searchItem",
    initialState: {
        keywords: "",
        priceSpread: [],
        rating: "",
    },
    reducers: {
        updateKeywords: (state, action) => {
            state.keywords = action.payload;
        },
        clearKeywords: (state, action) => {
            state.keywords = "";
        },
        filterPrice: (state, action) => {
            state.priceSpread = action.payload;
        },
        clearFilterPrice: (state, action) => {
            state.priceSpread = [];
        },
        filterRating: (state, action) => {
            state.rating = action.payload;
        },
        clearFilterRating: (state, action) => {
            state.rating = "";
        },
        clearAll: (state, action) => {
            state.rating = "";
            state.priceSpread = [];
            state.keywords = "";
        },
    },
});

export const loginSlice = createSlice({
    name: "auth",
    initialState: {
        isUserAuthenticated: !!getCookie('user_access_token'),
        isSellerAuthenticated: !!getCookie('seller_access_token'),
    },
    reducers: {
        login: (state, action) => {
            if (action.payload === 'userToken') {
                state.isUserAuthenticated = true;
                state.isSellerAuthenticated = false;
            } else {
                state.isSellerAuthenticated = true;
                state.isUserAuthenticated = false;
            }
        },
        logout: (state, action) => {
            state.isSellerAuthenticated = false;
            state.isUserAuthenticated = false;
            localStorage.removeItem('userToken');
            localStorage.removeItem('sellerToken');
        },
    },
});
export const {showCart, hideCart} = cartSlice.actions;
export const {
    updateKeywords,
    clearKeywords,
    filterPrice,
    clearFilterPrice,
    filterRating,
    clearFilterRating,
    clearAll
} = searchSlice.actions;
export const {login, logout} = loginSlice.actions;

export const CartReducer = cartSlice.reducer;
export const SearchReducer = searchSlice.reducer;
export const LoginReducer = loginSlice.reducer;
