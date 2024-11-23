import React from "react";
import cartItems from "./cartItems";
import MusicDetail from "./musicDetail";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItem, setPlayList } from "../redux/cartSlice";
import { useEffect } from "react";

// 아이콘 추가
import { BsFillBasket3Fill } from "react-icons/bs";

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
        <div>
            <div className="header">
                <div>UMC Playlist</div>
                <div>
                    <BsFillBasket3Fill />
                    {sum}
                </div>
            </div>
            <div className="main">
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
            <div className="footer">
                <button onClick={handleClearCartItem}>장바구니 초기화</button>
                <div>총 가격: {pricesum}</div>
            </div>
        </div>
    );
};

export default PlayList;
