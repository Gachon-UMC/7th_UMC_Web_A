import { CartIcon } from "../constants/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Navbar = () => {
  const { amount } = useSelector((state) => state.cart);
  return (
    <Container>
      <h3>PlayList</h3>
      <CartIconContainer>
        <CartIcon />
        <div>
          <p>{amount}</p>
        </div>
      </CartIconContainer>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

const CartIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: space-between;
`;
