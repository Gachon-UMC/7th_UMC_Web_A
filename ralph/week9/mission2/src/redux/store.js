import { configureStore } from "@reduxjs/toolkit";
import playListReducer from "./cartSlice";
import modalReducer from "../modal/modalSlice";
const store = configureStore({
    reducer: { playList: playListReducer, modal: modalReducer },
});
export default store;
