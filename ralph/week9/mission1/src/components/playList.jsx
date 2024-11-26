import React from "react";
import cartItems from "./cartItems";
import MusicDetail from "./musicDetail";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItem, setPlayList } from "../redux/cartSlice";
import { useEffect } from "react";

// 아이콘 추가
import { BsFillBasket3Fill } from "react-icons/bs";
import styled from "styled-components";

const PlayList = () => {
    const list = cartItems;
    const dispatch = useDispatch();
    const sum = useSelector((state) => state.playList.sum);
    const items = useSelector((state) => state.playList.items);
    const pricesum = useSelector((state) => state.playList.priceSum);

    useEffect(() => {
        console.log("Initializing Playlist:", list);
        dispatch(setPlayList(list)); // Redux 상태에 데이터 추가
    }, []);

    const handleClearCartItem = () => {
        dispatch(clearCartItem());
    };

    return (
        <div style={{ backgroundColor: "#CED8F6", height: "100%" }}>
            <HeaderDiv className="header">
                <div
                    style={{
                        display: "flex",
                        color: "white",
                        fontSize: "25px",
                        alignItems: "center",
                    }}
                >
                    UMC Playlist
                </div>
                <div
                    style={{
                        display: "flex",
                        color: "white",
                        fontSize: "25px",
                        alignItems: "center",
                    }}
                >
                    <BsFillBasket3Fill />
                    {sum}
                </div>
            </HeaderDiv>

            <div
                className="main"
                style={{
                    height: "90%",
                    width: "55vw",
                    margin: "auto",
                    marginTop: "30px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "30px",
                    }}
                >
                    &lt; 당신이 선택한 음반 &gt;
                </div>
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
            </div>
            <div
                className="footer"
                style={{
                    width: "55vw",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <hr
                    style={{
                        border: "1.5px solid black",
                        margin: "60px 0 20px 0",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginLeft: "5px",
                        marginRight: "5px",
                    }}
                >
                    <div style={{ fontSize: "18px" }}>총 가격 </div>
                    <div style={{ fontSize: "18px" }}>₩ {pricesum}</div>
                </div>

                <button
                    onClick={handleClearCartItem}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "10vw",
                        // height: "3vh",
                        margin: "auto",
                        marginTop: "6px",
                        border: "1px solid red",
                        borderRadius: "5px",
                        backgroundColor: "transparent",
                        color: "red",
                        fontSize: "15px",
                        textAlign: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    disabled={sum === 0}
                >
                    장바구니 초기화
                </button>
            </div>
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
