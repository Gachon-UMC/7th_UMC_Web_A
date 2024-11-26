import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseItem, decreaseItem, removeItem } from "../redux/cartSlice";
import styled from "styled-components";

// 아이콘 추가
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MusicDetail = ({ img, id, title, singer, amount, price }) => {
    const dispatch = useDispatch();

    // 증가  액션 이용 ( state 값도 이용 )
    const handleIncrease = () => {
        dispatch(increaseItem(id));
    };

    // 감소 액션 사용
    const handleDecrease = () => {
        dispatch(decreaseItem(id));
    };

    // 지우는 액션 사용
    const handleRemoveItem = () => {
        dispatch(removeItem(id));
    };

    //amount 값 가져오기
    const totalamount = useSelector(
        (state) =>
            state.playList.items.find((item) => item.id === id)?.amount || 0
    );

    return (
        <MainDiv>
            <ImgDiv>
                <img src={img} width="75px" height="75px"></img>
            </ImgDiv>
            <MainMusicInfoDiv>
                <MainMusicDetailDiv>
                    <div>{title}</div>
                    <div>&nbsp;|&nbsp;</div>
                    <div>{singer}</div>
                </MainMusicDetailDiv>
                <MainMusicPriceDiv>₩ {price}</MainMusicPriceDiv>
            </MainMusicInfoDiv>

            <MainMusicSideDiv>
                <ButtonStyle>
                    <ButtonStyle onClick={handleIncrease}>
                        <FaChevronUp />
                    </ButtonStyle>
                    <MainTotalDiv>{totalamount}</MainTotalDiv>
                    {/* onClick 속성 안에 조건 달기 */}
                    <ButtonStyle
                        onClick={
                            amount === 1
                                ? () => handleRemoveItem()
                                : () => handleDecrease()
                        }
                    >
                        <FaChevronDown />
                    </ButtonStyle>
                </ButtonStyle>
            </MainMusicSideDiv>
        </MainDiv>
    );
};
export default MusicDetail;

//css

const MainDiv = styled.div`
    display: flex;
    width: auto;
    margin-top: 20px;
`;

const ImgDiv = styled.div`
    margin-left: 5px;
`;

const MainMusicInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    gap: 5px;
    margin-left: 15px;
`;

const MainMusicDetailDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const MainMusicPriceDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    color: gray;
`;

const MainMusicSideDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`;

const MainTotalDiv = styled.div`
    display: flex;
`;

const ButtonStyle = styled.button`
    border: white;
    cursor: pointer;
    background-color: transparent; // 배경 투명하게 하기
`;
