import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { calculateTotals } from "./features/cart/cartSlice";
import { useSelector } from "react-redux";
import ModalPortal from "./components/ModalPortal";
import Modal from "./components/Modal";
import { store } from "./store/store";

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
      <main>
        <CartContainer />
        {isOpen && (
          <ModalPortal>
            <Modal>
              <h4>초기화 하시겠습니까?</h4>
            </Modal>
          </ModalPortal>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
