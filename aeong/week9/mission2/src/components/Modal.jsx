import ModalButton from "./ModalButton";
import styled from "styled-components";

const Modal = ({ children }) => {
  return (
    <StyledAside onClick={(e) => {}}>
      <div>
        {children}
        <ModalButton />
      </div>
    </StyledAside>
  );
};

export default Modal;

const StyledAside = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 15rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
`;
