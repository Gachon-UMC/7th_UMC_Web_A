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
  width: 10rem;
  height: 10rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
