import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseItem, decreaseItem, removeItem } from "../redux/cartSlice";
import styled from "styled-components";

// 아이콘 추가
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

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
        <div style={{ display: "flex", width: "auto", marginTop: "20px" }}>
            <div style={{ marginLeft: "5px" }}>
                <img src={img} width="75px" height="75px"></img>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: "1",
                    justifyContent: "center",
                    gap: "5px",
                    marginLeft: "15px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: " wrap",
                    }}
                >
                    <div>{title}</div>
                    <div>&nbsp;|&nbsp;</div>
                    <div>{singer}</div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start ",
                        color: "gray",
                    }}
                >
                    ₩ {price}
                </div>
            </div>

            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <ButtonStyle onClick={handleIncrease}>
                        <FaChevronUp />
                    </ButtonStyle>
                    <div style={{ display: "flex" }}>{totalamount}</div>
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
                </div>
            </div>
        </div>
    );
};
export default MusicDetail;

//css
const ButtonStyle = styled.button`
    border: white;
    cursor: pointer;
    background-color: transparent; // 배경 투명하게 하기
`;
