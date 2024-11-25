import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: { modalState: false },
    reducers: {
        showModal: (state) => {
            state.modalState = true; // 모달 열기
        },
        closeModal: (state) => {
            state.modalState = false; // 모달 닫기
        },
    },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
