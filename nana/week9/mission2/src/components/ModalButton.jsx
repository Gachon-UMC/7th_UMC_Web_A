import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";
import styled from "styled-components";

const ModalButton = () => {
    const dispatch = useDispatch();

    return (
        <ModalOverlay>
            <ModalContent>
                <h3>담아두신 항목을 모두 삭제하시겠습니까?</h3>
                <ButtonContainer>
                    <Button
                        type="button"
                        confirm
                        onClick={() => {
                            dispatch(clearCart());
                            dispatch(closeModal());
                        }}
                    >
                        네
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {
                            dispatch(closeModal());
                        }}
                    >
                        아니요
                    </Button>
                </ButtonContainer>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ModalButton;

// 스타일드 컴포넌트

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);  /* 배경을 어둡게 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* 모달이 가장 위에 오도록 */
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    
    background-color: ${(props) => (props.confirm ? "#4caf50" : "#f44336")};
    color: white;

    &:hover {
        transform: scale(1.05);
    }
`;
