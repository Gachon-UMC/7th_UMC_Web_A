import { useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "../constants/icons";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";
import styled from "styled-components";

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <CartItemContainer>
      <Img src={img} alt={`${title} 이미지`} />
      <InfoContainer>
        <h4>
          {title}|{singer}
        </h4>
        <h4>{price}</h4>
      </InfoContainer>
      <div>
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
      </div>
    </CartItemContainer>
  );
};

export default CartItem;

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
