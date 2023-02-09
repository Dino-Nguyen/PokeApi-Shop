import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        modal: modalReducer,
        cart: cartReducer
    }
});

export default store;