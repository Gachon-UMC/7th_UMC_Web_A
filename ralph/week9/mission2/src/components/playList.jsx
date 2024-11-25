import React from "react";
import cartItems from "./cartItems";
import MusicDetail from "./musicDetail";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItem, setPlayList } from "../redux/cartSlice";
import { useEffect } from "react";
// 아이콘 추가
import { BsFillBasket3Fill } from "react-icons/bs";
import styled from "styled-components";

import { showModal, closeModal } from "../modal/modalSlice";
import Modal from "react-modal";
const PlayList = () => {
    const list = cartItems;
    const dispatch = useDispatch();
    const sum = useSelector((state) => state.playList.sum);
    const items = useSelector((state) => state.playList.items);
    const pricesum = useSelector((state) => state.playList.priceSum);
    const modalstate = useSelector((state) => state.modal.modalState);
    console.log(modalstate);

    useEffect(() => {
        console.log("Initializing Playlist:", list);
        dispatch(setPlayList(list)); // Redux 상태에 데이터 추가
    }, []);

    // 초기화 버튼을 누르면 showModal 메서드가 실행되도록 함
    const handleShowModal = () => {
        dispatch(showModal());
    };

    const handleYesModal = () => {
        dispatch(clearCartItem()); //  초기화 버튼을 누르고 "예" 버튼을 누르면 전첵 목록 지워지도록 상태를 변경
        dispatch(closeModal()); // "예" 버튼을 누르면 모달 창 닫게 하는 코드
    };

    const handleNoModal = () => {
        dispatch(closeModal()); // "아니요" 버튼 누르면 모달 창 닫게 하는 코드
    };

    return (
        <div style={{ backgroundColor: "#CED8F6", height: "auto" }}>
            <HeaderDiv className="header">
                <HeaderTitleDiv>UMC Playlist</HeaderTitleDiv>
                <HeaderSumDiv>
                    <BsFillBasket3Fill />
                    {sum}
                </HeaderSumDiv>
            </HeaderDiv>

            <MainDiv className="main">
                <MainTitleDiv>&lt; 당신이 선택한 음반 &gt;</MainTitleDiv>

                {/* items로 map 메서드 이용 */}
                {items?.map((playlist) => (
                    <MusicDetail
                        key={playlist.id}
                        img={playlist.img}
                        id={playlist.id}
                        title={playlist.title}
                        singer={playlist.singer}
                        amount={playlist.amount}
                        price={playlist.price}
                    />
                ))}
            </MainDiv>
            <FooterDiv className="footer">
                <hr
                    style={{
                        border: "1.5px solid black",
                        margin: "60px 0 20px 0",
                    }}
                />
                <FooterDetailDiv>
                    <FooterDetailSumDiv> 총 가격 </FooterDetailSumDiv>
                    <FooterDetailSumDiv>₩ {pricesum}</FooterDetailSumDiv>
                </FooterDetailDiv>

                <FooterResetButton
                    onClick={handleShowModal}
                    disabled={sum === 0}
                >
                    장바구니 초기화
                </FooterResetButton>

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
                        <ModalButtonDetailDiv
                            onClick={handleYesModal}
                            bteStyle="blue"
                        >
                            네
                        </ModalButtonDetailDiv>
                        <ModalButtonDetailDiv
                            onClick={handleNoModal}
                            bteStyle="red"
                        >
                            아니요
                        </ModalButtonDetailDiv>
                    </ModalButtonDiv>
                </Modal>
            </FooterDiv>
        </div>
    );
};
export default PlayList;
//css
const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    height: 5vh;
    background-color: #5858fa;
`;

const HeaderTitleDiv = styled.div`
    display: flex;
    color: white;
    font-size: 25px;
    align-items: center;
`;
const HeaderSumDiv = styled.div`
    display: flex;
    color: white;
    font-size: 25px;
    align-items: center;
`;

const MainDiv = styled.div`
    height: auto;
    width: 55vw;
    margin: auto;
    margin-top: 30px;
`;

const MainTitleDiv = styled.div`
    display: flex;
    justify-content: center;
    font-size: 30px;
`;

const FooterDiv = styled.div`
    width: 55vw;
    margin: auto;
    display: flex;
    flex-direction: column;
`;

const FooterDetailDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
    margin-right: 5px;
`;

const FooterDetailSumDiv = styled.div`
    font-size: 18px;
`;

const FooterResetButton = styled.button`
    display: flex;
    justify-content: center;
    width: 120px;
    height: 30px;
    margin: auto;
    margin-top: 6px;
    border: 1px solid red;
    border-radius: 5px;
    background-color: transparent;
    color: red;
    font-size: 15px;
    text-align: center;
    align-items: center;
    cursor: pointer;
`;

const ModalTitleDiv = styled.div`
    font-size: 18px;
`;

const ModalButtonDiv = styled.div`
    display: flex;
    align-items: space-evenly;
    gap: 7vw;
`;

const ModalButtonDetailDiv = styled.button`
    border: 1px solid ${(props) => props.bteStyle};
    width: 65px;
    background-color: white;
    border-radius: 5px;
    font-size: 15px;
    box-shadow: 1px 1px ${(props) => props.bteStyle};
    cursor: pointer;
`;

// const ModalDiv = styled.div`
//     width: 30vw;
//     height: 15vh;
//     margin: auto;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-evenly;
//     align-items: center;
//     border: 2px solid #d8d8d8;
//     border-radius: 8px;
//     box-shadow: 2px 1px #e6e6e6;
// `;
