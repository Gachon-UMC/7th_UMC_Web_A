import ReactDOM from "react-dom"
import styled from "styled-components"

function ModalOverlay(props) {
  const content = (
    <Backdrop>
      <Modal>
        <h1>장바구니를 전부 비우시겠습니까?</h1>
        <div className="btn-container">
          <button type="button" onClick={props.handleYes}>
            네
          </button>
          <button type="button" onClick={props.handleNo}>
            아니오
          </button>
        </div>
      </Modal>
    </Backdrop>
  )

  return ReactDOM.createPortal(content, document.getElementById("modal-hook")!)
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 흐릿한 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* 모달이 다른 요소 위에 오도록 설정 */
`

const Modal = styled.aside`
  position: fixed;
  width: 40vw;
  height: 30vh;
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1001; /* 백드롭 위에 위치 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 화면 중앙 정렬 */

  & > .btn-container {
    margin-top: 1rem;
    width: 12rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;

    & > button {
      width: 5rem;
      height: 2.5rem;
      background-color: transparent;
      border: 1px solid black;
      border-radius: 10px;
      cursor: pointer;

      &:hover {
        background-color: red;
        color: white;
        border: none;
      }
    }
  }
`

export default ModalOverlay
