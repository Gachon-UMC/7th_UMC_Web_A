import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// 총 가격
// 1개씩 올리면 가격 증가 및 갯수 증가 , 내리면 갯수 증가
// 총 갯수 장바구니로
// 근데 초깃값에 대한 데이터를 만들어줘야 되는 거 아님 ?
// 초기화 누르면 모든 데이터 삭제

interface CartState {
  amount: number
  id: string
  img: string
  price: string
  singer: string
  title: string
}

const initialState: CartState[] = []
export const cartSlice = createSlice({
  // 식별자 키가 name이라 string으로 작성되어야 함
  name: "cartFunction",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartState[]>) => {
      return action.payload // 초기 상태를 전달받아 설정
    },
    increase: (state, action) => {
      const item = state.find(item => item.id === action.payload)
      if (item) {
        item.amount += 1 // 직접 변경처럼 보이지만 Immer가 처리
      }
    },
    decrease(state, action: PayloadAction<string>) {
      const itemIndex = state.findIndex(item => item.id === action.payload)
      if (itemIndex !== -1) {
        if (state[itemIndex].amount > 1) {
          state[itemIndex].amount -= 1 // Immer가 자동으로 상태 변경 추적
        } else {
          // splice는 배열의 원본을 수정
          // state.splice(itemIndex, 1) // 배열에서 해당 아이템 제거
          return state.filter(item => item.id !== action.payload)
        }
      }
    },
    resetCart: state => {
      return []
    },
  },
})
export const { addCart, increase, decrease, resetCart } = cartSlice.actions
export default cartSlice.reducer
