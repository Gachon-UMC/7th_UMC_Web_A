import { useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "../constants/icons";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";
import styled from "styled-components";

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <CartItemContainer>
      <InfoContainer>
        <Img src={img} alt={`${title} 이미지`} />
        <Info>
          <h4>
            {title}|{singer}
          </h4>
          <h4>{price}</h4>
        </Info>
      </InfoContainer>
      <CountContainer>
        <button className="amount-bnt" onClick={() => dispatch(increase(id))}>
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-bnt"
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          <ChevronDown />
        </button>
      </CountContainer>
    </CartItemContainer>
  );
};

export default CartItem;

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const CountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .amount-bnt {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
  }

  .amount {
    margin: 0.5rem 0;
    font-size: 1rem;
    font-weight: bold;
  }
`;
