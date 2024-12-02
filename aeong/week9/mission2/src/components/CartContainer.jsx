import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { openModal } from "../features/modal/modalSlice";
import styled from "styled-components";

const CartContainer = () => {
  const { cartItems, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <Container>
      <hr />
      <header>
        <h2>당신이 선택한 음반</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <FooterContainer>
        <hr />
        <div className="cart-total">
          <h4>총 가격</h4>
          <h4>{total}원</h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
          장바구니 초기화
        </button>
      </FooterContainer>
    </Container>
  );
};

export default CartContainer;
const Container = styled.section`
  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 20px 0;
  }
`;

const FooterContainer = styled.div`
  .cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      margin: 0;
      font-size: 1.2rem;
    }
  }

  .btn.clear-btn {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 0.8rem;
    color: red;
    border: 2px solid red;
    border-radius: 0.5rem;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: red;
      color: white;
    }
  }
`;
