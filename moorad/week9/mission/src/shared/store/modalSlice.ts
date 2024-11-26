import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const modalSlice = createSlice({
  name: "modalFunction",
  initialState: { isOpened: false },
  reducers: {
    changeState: state => {
      state.isOpened = !state.isOpened
    },
  },
})
export const { changeState } = modalSlice.actions
export default modalSlice.reducer
