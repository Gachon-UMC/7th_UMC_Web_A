import React from "react";
import { axiosInstance2 } from "../apis/axiosInstance2";
// 유저의 정보를 가져오는 컴포넌트
const QueryUserInfo = async (token) => {
    try {
        const getData = await axiosInstance2.get("user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return getData.data;
    } catch (error) {
        console.error("유저 정보를 볼러오는 것을 실패했습니다", error);
    }
};

export default QueryUserInfo;
