import React from "react";
import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "playList",
    initialState: {
        items: [],

        sum: 0,
        priceSum: 0,
    },
    reducers: {
        // 초기 데이터 생성
        setPlayList: (state, action) => {
            console.log(action.payload.length);
            // setPlayList(list) 이렇게 받은 list가 action.payload에 들어가 있기 때문에 다음과 같은 코드로 items state 값을 변경해줌
            state.items = action.payload;
            console.log(state.items);
            // 추가된 배열의 길이를 이용해서 전체 항목 수를 구함
            state.sum = state.items.length;
            console.log(state.items.length);
            console.log(state.sum);
            console.log(action.payload);
        },

        // amount 1 증가 메서드
        increaseItem: (state, action) => {
            console.log(action.payload); //id 값이 넘어가는 것을 알 수 있음
            console.log(state.items.amount); // undefined
            console.log(state.items);

            const item = state.items.find((item) => item.id === action.payload);
            console.log(item.price);

            console.log(action.payload);
            console.log(state.items.length);

            if (item) {
                console.log(item.price);
                state.priceSum += Number(item.price);
                item.amount += 1; // 해당 ID의 amount 증가
                state.sum += 1; // 전체 선택한 목록의 수 +1
            }

            console.log(state.sum);
        },

        // amount 1 감소 메서드
        decreaseItem: (state, action) => {
            console.log(state);
            console.log(action.payload);
            console.log(state.sum);

            // map 메서드를 사용하기 때문에 전역변수로 사용하게 되면 각 목록별로 독립적으로 작동하지 못한다고 생각해서
            // 각 항목 별로 다른 id 값으로 각 목록을 불러와야 겠다고 생각
            // map 메소드때 id 값을 보낸걸 받아서 그 항목이 어떤 항목인지 배열 형태로 item에 저장
            const item = state.items.find((item) => item.id === action.payload);

            console.log(item.price);
            // item.price 값이 숫자 타입이 아니여서 앞에 Number 붙임
            if (item) {
                state.priceSum -= Number(item.price);
                item.amount -= 1; // 해당 ID의 amount 감소
                state.sum -= 1; // 전체 선택한 목록의 수 - 1
            }

            console.log(state.sum);
        },

        // amount 가 0이 되면 목록에서 사라지는 메서드
        removeItem: (state, action) => {
            console.log(action.payload);

            const item = state.items.find((item) => item.id === action.payload);

            console.log(item);

            if (item) {
                state.items = state.items.filter(
                    (Item) => Item.id !== action.payload
                );
                state.priceSum -= Number(item.price);
                // 여기도 이걸 넣어줘야 하는 이유: amount가 1 일때는 아래 버튼을 누르면 removeItem 메서드가 동작하도록 설정을 해놓았기
                //때문에 amount 가 1일때 목록에서 사라지면서 총 가격에서도 그 항목의 가격만큼 줄어야 하기 때문에
                state.sum -= 1; // 위와 똑같이 전체 개수도 1개씩 줄어야 하므로 다음과 같이 적어 놓음
                console.log("성공");
            }
        },

        // 전체 목록을 다 초기화 시키는 메서드
        clearCartItem: (state, action) => {
            state.items = []; // 배열을 초기화 시켜서 아무것도 안보이게 해버림
            state.priceSum = 0; // 초기화 버튼을 누르면 전체 가격을 0원으로 만들어 주기
            state.sum = 0; // 위에 뜨는 전체 개수를 0개로 만들어 주기
        },

        //
        calculateTotals: (state, action) => {
            // item.price 값이 숫자 타입이 아니여서 앞에 Number 붙임
            const a = action.payload.map((list) => Number(list.price));

            console.log(a.length);

            // 만약 amount가 0 으로 설정되어 있으면 그냥 let pricesum=0 이렇게 하면 되는데
            //  초기 데이터가 기본적으로 amount가 1 이 들어가 있어서 priceSum 이라는 전체 가격의 합 관련된 상태값을 구하기 위해 다음 과 같은 작업을 함
            let pricesum = 0;
            for (let i = 0; i < a.length; i++) {
                pricesum += a[i];
            }
            // 초기값을 priceSum 초기값으로 최신화 해줌
            state.priceSum = pricesum;
        },
    },
});

export const {
    setPlayList,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCartItem,
    calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
