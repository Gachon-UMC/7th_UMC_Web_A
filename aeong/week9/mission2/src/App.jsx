import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { calculateTotals } from "./features/cart/cartSlice";
import { useSelector } from "react-redux";
import ModalPortal from "./components/ModalPortal";
import Modal from "./components/Modal";
import styled from "styled-components";

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <MainContainer>
        <CartContainer />
        {isOpen && (
          <ModalPortal>
            <Modal>
              <h3>초기화 하시겠습니까?</h3>
            </Modal>
          </ModalPortal>
        )}
      </MainContainer>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;

const MainContainer = styled.div`
  margin-left: 20rem;
  margin-right: 20rem;
`;
