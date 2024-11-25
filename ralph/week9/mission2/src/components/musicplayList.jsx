import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import cartItems from "./cartItems";
import MusicDetail from "./musicDetail";
import { setPlayList } from "../redux/cartSlice";
import { showModal } from "../modal/modalSlice";
import ModalPage from "../modal/modalPage";

// 아이콘 추가
import { BsFillBasket3Fill } from "react-icons/bs";
import styled from "styled-components";

const PlayList = () => {
    const dispatch = useDispatch();

    // list 받아오기
    const list = cartItems;

    const sum = useSelector((state) => state.playList.sum);
    const items = useSelector((state) => state.playList.items);
    const pricesum = useSelector((state) => state.playList.priceSum);

    useEffect(() => {
        console.log("Initializing Playlist:", list);
        dispatch(setPlayList(list)); // Redux 상태에 데이터 추가 , 상태값에 추가하기
    }, []);

    // 초기화 버튼을 누르면 showModal 메서드가 실행되도록 함
    const handleShowModal = () => {
        dispatch(showModal());
    };

    return (
        <RootDiv>
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
                {/* 구분선 만들기 */}
                <FooterHorizonDiv />

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

                <ModalPage />
            </FooterDiv>
        </RootDiv>
    );
};
export default PlayList;
//css

const RootDiv = styled.div`
    background-color: #ced8f6;
    height: auto;
`;
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

const FooterHorizonDiv = styled.hr`
    border: 1.5px solid black;
    margin: 60px 0 20px 0;
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
