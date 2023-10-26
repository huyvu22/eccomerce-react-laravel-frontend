import {createSlice} from "@reduxjs/toolkit";
import {cartSlice, loginSlice} from "../../../layouts/Header/HeaderSlice";

export const modalLoginSlice = createSlice({
    name: "modalLogin",
    initialState: {
        isShowLoginModal: false,
    },
    reducers: {
        showModalLogin: (state, action) => {
            state.isShow = true;
        },
        hideModalLogin: (state, action) => {
            state.isShow = false;
        }
    },
});

export const {showModalLogin, hideModalLogin} = modalLoginSlice.actions;
export const ModalLoginReducer = modalLoginSlice.reducer;