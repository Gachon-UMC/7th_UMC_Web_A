import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const ModalButton = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.modal);

  return (
    <ModalButtonContainer>
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
    </ModalButtonContainer>
  );
};

export default ModalButton;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    width: 5.4rem;
    height: 3rem;
    font-size: 1rem;
    border-radius: 0.4rem;
    border: 0.14rem solid transparent;
    background: none;
    cursor: pointer;

    &:first-of-type {
      color: green;
      border-color: green;

      &:hover {
        background: rgba(0, 128, 0, 0.2);
      }
    }

    &:last-of-type {
      color: red;
      border-color: red;

      &:hover {
        background: rgba(255, 0, 0, 0.2);
      }
    }
  }
`;
