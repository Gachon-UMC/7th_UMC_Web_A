import { createSlice } from "@reduxjs/toolkit";
export const titleSlice = createSlice({
    name: "title",
    initialState: { value: "" },
    reducers: {
        setTitle: (state, action) => {
            state.value = action.payload;
        },
        setTodoTitle: (state, action) => {
            state.value = action.payload.title;
        },
        //Redux 상태에서 name 속성을 action.payload 값으로 업데이트하는 코드
        // action 객체는 디스패치된 액션을 나타내며, payload는 액션과 함께 전달된 데이터
        //이 코드는 현재 상태의 name 속성을 action.payload 값으로 변경
    },
});
export const { setTitle, setTodoTitle } = titleSlice.actions;
export default titleSlice.reducer;
