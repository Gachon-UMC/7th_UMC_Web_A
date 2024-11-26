import styled from "styled-components"
import cartItems from "./shared/constants/cartItems"
import Item from "./widgets/Item"
import Header from "./widgets/Header"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  addCart,
  increase,
  decrease,
  resetCart,
} from "./shared/store/cartSlice"
import { changeState } from "./shared/store/modalSlice"
import ModalOverlay from "./widgets/Modal"
import { RootState } from "./shared/store/store"
import { useState } from "react"

const App = () => {
  // 전역 변수로 cartItems id랑 숫자 기본 값 설정
  // 장바구니에 들어오면 1이니까
  const dispatch = useDispatch()
  const [total, setTotal] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const cart = useSelector((state: RootState) => state.cart)

  const { isOpened } = useSelector((state: RootState) => state.modal)

  useEffect(() => {
    dispatch(addCart(cartItems))
  }, [])

  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => acc + item.amount, 0)
    const tempPrice = cart.reduce(
      (acc, item) => acc + Number(item.price) * item.amount,
      0,
    )
    setTotal(totalAmount)
    setTotalPrice(tempPrice)
  }, [cart])

  return (
    <>
      {isOpened && (
        <ModalOverlay
          handleYes={() => {
            dispatch(changeState())
            dispatch(resetCart())
          }}
          handleNo={() => dispatch(changeState())}
        ></ModalOverlay>
      )}
      <Header total={total}></Header>
      <CartContainer>
        {cart.map(item => {
          return (
            <Item
              key={item.id}
              item={item}
              onIncrease={() => dispatch(increase(item.id))}
              onDecrease={() => dispatch(decrease(item.id))}
            ></Item>
          )
        })}
      </CartContainer>
      <Footer>
        <span>총 가격</span>
        <span>₩ {totalPrice}</span>
      </Footer>
      <ButtonContainer>
        <button type="button" onClick={() => dispatch(changeState())}>
          장바구니 초기화
        </button>
      </ButtonContainer>
    </>
  )
}

const CartContainer = styled.main`
  padding: 1rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
const Footer = styled.footer`
  width: 100%;
  height: 3rem;
  padding: 0 8rem;
  display: flex;
  font-size: 1.5rem;
  justify-content: space-between;
  align-items: center;
`

const ButtonContainer = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  margin-bottom: 2rem;

  justify-content: center;
  align-items: center;
  & > button {
    width: 10rem;
    height: 3rem;
    border: 1px solid red;
    font-size: 1.2rem;
    color: red;
    background-color: transparent;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: red;
      color: white;
    }
  }
`

export default App
