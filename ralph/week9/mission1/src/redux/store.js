import { configureStore } from "@reduxjs/toolkit";
import playListReducer from "./cartSlice";
const store = configureStore({
    reducer: { playList: playListReducer },
});
export default store;
