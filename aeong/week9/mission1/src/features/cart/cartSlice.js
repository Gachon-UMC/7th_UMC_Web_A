import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";
import CartItem from "../../components/CartItem";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  tatal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ToDo: 증가
    increase: (state, { payload }) => {
      // 내가 클릭한 음반의 ID를 가져옴
      const itemId = payload;
      // id 비교를 통해 전체 음반 중 내가 클릭한 음반을 찾음
      const item = state.cartItems.find((CartItem) => CartItem.id === itemId);
      // 아이템 수량 증가
      item.amount += 1;
    },

    // ToDo: 감소
    decrease: (state, { payload }) => {
      // 내가 클릭한 음반의 ID를 가져옴
      const itemId = payload;
      // id 비교를 통해 전체 음반 중 내가 클릭한 음반을 찾음
      const item = state.cartItems.find((CartItem) => CartItem.id === itemId);
      // 아이템 수량 감소
      item.amount -= 1;
    },
    // ToDo: 아이템 제거
    removeItem: (state, { payload }) => {
      // 내가 클릭한 음반의 ID를 가져옴
      const itemId = payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    // ToDo: 모든 아이템 제거 (clear)
    clearCart: (state) => {
      state.cartItems = [];
    },
    // ToDo: 토탈을 계산. SUM(각각의 아이템 * 수량)
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});
export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
