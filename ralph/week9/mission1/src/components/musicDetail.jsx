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
        <div>
            <div>
                <img src={img} width="80px" height="80px"></img>
            </div>
            <div>{title}</div>
            <div>{singer}</div>
            <div>₩{price}</div>
            <div>
                <div>
                    <ButtonStyle onClick={() => handleIncrease()}>
                        <FaChevronUp />
                    </ButtonStyle>
                    <div>{totalamount}</div>
                    {/* onClick 속성 안에 조건 달기 */}
                    <ButtonStyle
                        onClick={
                            amount === 0
                                ? handleRemoveItem()
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
    background-color: white;
    border: white;
    cursor: pointer;
`;
