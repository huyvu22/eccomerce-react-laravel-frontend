import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {getCookie} from "../../utils/dataHandler";

export const cartSlice = createSlice({
    name: "cartSidebar",
    initialState: {
        isShow: false,
        isShowCate: false,
        isShowMenu: false,
    },
    reducers: {
        showCart: (state, action) => {
            state.isShow = true;
            document.querySelector('.back-drop').style.zIndex = 14
        },
        hideCart: (state, action) => {
            state.isShow = false;
            document.querySelector('.back-drop').style.zIndex = 10
        },
        showCategory: (state, action) => {
            state.isShowCate = true;
            document.querySelector('.back-drop').style.zIndex = 14
        },
        hideCategory: (state, action) => {
            state.isShowCate = false;
            document.querySelector('.back-drop').style.zIndex = 10
        },

        showMenu: (state, action) => {
            state.isShowMenu = true;
            document.querySelector('.back-drop').style.zIndex = 14
        },
        hideMenu: (state, action) => {
            state.isShowMenu = false;
            document.querySelector('.back-drop').style.zIndex = 10
        },
    },
});

export const searchSlice = createSlice({
    name: "searchItem",
    initialState: {
        keywords: "",
        priceSpread: [],
        rating: "",
        inputSearchFocus: false,
    },
    reducers: {
        onFocus: (state, action) => {
            state.inputSearchFocus = action.payload;
        },
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
        isShowLoginModal: false,
    },
    reducers: {
        login: (state, action) => {
            if (action.payload === 'user_access_token') {
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
            sessionStorage.removeItem('buyer-google-login');
            window.location.reload();
        }
    },
});
export const {showCart, hideCart, showCategory, hideCategory, showMenu, hideMenu} = cartSlice.actions;
export const {
    onFocus,
    updateKeywords,
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
