import { createSlice } from "@reduxjs/toolkit";
export const idSlice = createSlice({
    name: "id",
    initialState: { value: "" },
    reducers: {
        setId: (state, action) => {
            state.value = action.payload;
        },
        setTodoId: (state, action) => {
            state.value = action.payload.Id;
        },
    },
});
export const { setId, setTodoId } = idSlice.actions;
export default idSlice.reducer;
