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
  margin-left: 20rem;
  margin-right: 20rem;
  margin-bottom: 1rem;
  justify-content: space-between;

  h3 {
    font-size: 2rem;
  }
`;

const CartIconContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  div {
    position: absolute;
    top: 1.5rem;
    right: 0rem;
    background-color: #828fbf;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
