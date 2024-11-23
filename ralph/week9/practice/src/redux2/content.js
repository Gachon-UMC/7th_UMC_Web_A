import { createSlice } from "@reduxjs/toolkit";
export const contentSlice = createSlice({
    name: "content",
    initialState: { value: "" },
    reducers: {
        setContent: (state, action) => {
            state.value = action.payload;
        },
        setTodoContent: (state, action) => {
            state.value = action.payload.content;
        },
    },
});

export const { setContent, setTodoContent } = contentSlice.actions;
export default contentSlice.reducer;
// 또는 export default
