import {createSlice} from "@reduxjs/toolkit";
import {showToast} from "../Toast/Toast";

const stateFromLocalStorage = JSON.parse(localStorage.getItem("myList"));
let initialState = {
    isClick: false,
    cartList: [],
    wishList: [],
    compareList: [],
    email: "",
    itemDetails: {},
    loading: true,
    isResetCart: false,
};

export const saveToLocalStorage = (state) => {
    localStorage.setItem(
        "myList",
        JSON.stringify({...state, email: state.email})
    );
};

export const productCardSlice = createSlice({
    name: "myList",
    initialState: stateFromLocalStorage || initialState,
    reducers: {
        updateState: (state, action) => {
            const newState = action.payload;
            state.cartList = newState.cartList;
            state.wishList = newState.wishList;
            state.compareList = newState.compareList;
            state.email = newState.email;
            state.itemDetails = newState.itemDetails
            saveToLocalStorage(state);
        },
        updateEmail: (state, action) => {
            state.email = action.payload;
            saveToLocalStorage(state);
        },
        addItem: (state, action) => {
            state.cartList.push(action.payload);
            saveToLocalStorage(state);
            state.isClick = !state.isClick;
        },

        removeItem: (state, action) => {
            // let index = state.cartList
            //   .map((item) => item.id)
            //   .lastIndexOf(action.payload);
            // if (index !== -1) {
            //   state.cartList.splice(index, 1);
            //   saveToLocalStorage(state);
            //   state.isClick = !state.isClick;
            // }
            const id = action.payload;
            let index = state.cartList.findIndex(
                (item) => item.id === action.payload
            );
            state.isClick = !state.isClick;
            if (index !== -1) {
                const item = state.cartList[index];
                item.quantity = item.quantity - 1;
                saveToLocalStorage(state);
            }
        },

        deleteItem: (state, action) => {
            let cartListClone = state.cartList;
            state.cartList = cartListClone.filter(
                (item) => item.id !== action.payload
            );
            saveToLocalStorage(state);
            state.isClick = !state.isClick;
        },

        wishItem: (state, action) => {
            state.wishList.push(action.payload);
            saveToLocalStorage(state);
            state.isClick = !state.isClick;
        },

        unWishItem: (state, action) => {
            // state.compareItems = state.compareItems.filter(item => item.id !== action.payload.id);
            let index = state.wishList.findIndex(
                (item) => item.id === action.payload
            );
            state.wishList.splice(index, 1);
            saveToLocalStorage(state);
            state.isClick = !state.isClick;
        },

        addToCompare: (state, action) => {
            if (state.compareList.length < 3) {
                state.compareList.push(action.payload);
                saveToLocalStorage(state);
                state.isClick = !state.isClick;
            } else {
                alert("You already added 3 products");
            }
        },

        removeFromCompare: (state, action) => {
            let index = state.compareList.findIndex(
                (item) => item.id === action.payload
            );
            state.compareList.splice(index, 1);
            saveToLocalStorage(state);
            state.isClick = !state.isClick;
        },

        deleteCompareList: (state, action) => {
            state.compareList = [];
            saveToLocalStorage(state);
            state.isClick = !state.isClick;
        },

        showDetail: (state, action) => {
            state.itemDetails = action.payload;
            state.isClick = !state.isClick;
        },

        resetCart: (state) => {
            state.cartList = [];
            state.wishList = [];
            state.compareList = [];
            state.isResetCart = true;
            window.location.reload();
            localStorage.removeItem('myList');
        }
    },
});
export const {
    updateState,
    updateEmail,
    addItem,
    removeItem,
    wishItem,
    unWishItem,
    deleteItem,
    addToCompare,
    removeFromCompare,
    deleteCompareList,
    showDetail,
    resetCart
} = productCardSlice.actions;

export default productCardSlice.reducer;
