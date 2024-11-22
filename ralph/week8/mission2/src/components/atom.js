import { atom } from "recoil";

// 각 목록별 iD를 저장하는 state
export const idState = atom({
    key: "idState",
    default: "",
});

//  각 목록별 title을 저장하는 state
export const titleState = atom({
    key: "titleState",
    default: "",
});

// 각 목록별 content를 저장하는 state
export const contentState = atom({
    key: "contentState",
    default: "",
});

// search 바에 적은 내용을 기억하는 state
export const searchState = atom({
    key: "searchState",
    default: "",
});
