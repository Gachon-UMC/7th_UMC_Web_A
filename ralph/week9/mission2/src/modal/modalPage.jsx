import React from "react";
import { clearCartItem } from "../redux/cartSlice";
import { showModal, closeModal } from "../modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "react-modal";

// 이거 경고 창 뜸 ( )
Modal.setAppElement("#root");

const ModalPage = () => {
    const dispatch = useDispatch();

    const modalstate = useSelector((state) => state.modal.modalState);

    const handleYesModal = () => {
        dispatch(clearCartItem()); //  초기화 버튼을 누르고 "예" 버튼을 누르면 전첵 목록 지워지도록 상태를 변경
        dispatch(closeModal()); // "예" 버튼을 누르면 모달 창 닫게 하는 코드
    };

    const handleNoModal = () => {
        dispatch(closeModal()); // "아니요" 버튼 누르면 모달 창 닫게 하는 코드
    };

    return (
        <Modal
            isOpen={modalstate}
            style={{
                content: {
                    width: "30vw",
                    height: "15vh",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    border: "2px solid #d8d8d8",
                    borderRadius: "8px",
                    boxShadow: "2px 1px #e6e6e6",
                },
            }}
        >
            <ModalTitleDiv>
                담아 놓으신 모든 음반을 삭제 하시겠습니까?
            </ModalTitleDiv>
            <ModalButtonDiv>
                <ModalButtonDetailDiv onClick={handleYesModal} $btnstyle="blue">
                    네
                </ModalButtonDetailDiv>
                <ModalButtonDetailDiv onClick={handleNoModal} $btnstyle="red">
                    아니요
                </ModalButtonDetailDiv>
            </ModalButtonDiv>
        </Modal>
    );
};

export default ModalPage;

//css
const ModalTitleDiv = styled.div`
    font-size: 18px;
`;

const ModalButtonDiv = styled.div`
    display: flex;
    align-items: space-evenly;
    gap: 7vw;
`;

const ModalButtonDetailDiv = styled.button`
    border: 1px solid ${(props) => props.btnstyle};
    width: 65px;
    background-color: white;
    border-radius: 5px;
    font-size: 15px;
    box-shadow: 1px 1px ${(props) => props.bteStyle};
    cursor: pointer;
`;
