import { createSlice } from "@reduxjs/toolkit";

let nextId = 0;
const initialState = [];

export const todoSlice = createSlice({
  // reducer 이름
  name: "todofunction",
  initialState,
  // action 형식 지정
  reducers: {
    // 할 일 입력창에 입력되는 텍스트를 값에 추가
    add: (state, action) => {
      nextId++;
      state.push({
        id: nextId,
        text: action.payload,
        complete: false,
      });
    },
    // 선택된 할 일을 제외한 모든 할 일들을 새로운 객체로 리턴
    remove: (state, action) => {
      return state.filter((e) => e.id !== action.payload);
    },
    // 선택된 할 일을 true값으로 변경
    complete: (state, action) => {
      return state.map((e) =>
        e.id === action.payload ? { ...e, complete: !e.complete } : e
      );
    },
  },
});

export const { add, remove, complete } = todoSlice.actions;
//store에서 add, remove, complte 액션을 내보낸다.
export default todoSlice.reducer;
