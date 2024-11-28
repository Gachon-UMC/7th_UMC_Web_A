import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";
import { useSelector, useDispatch } from "react-redux";

const ModalButton = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.modal);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          dispatch(clearCart());
          // 모달 꺼지는 상태 연결
          dispatch(closeModal());
        }}
      >
        네
      </button>
      <button
        type="button"
        onClick={() => {
          // 모달 꺼지는 상태 연결
          dispatch(closeModal());
        }}
      >
        아니요
      </button>
    </div>
  );
};

export default ModalButton;
