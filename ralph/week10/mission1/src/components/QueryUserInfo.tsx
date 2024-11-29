import React from "react";
import { axiosInstance2 } from "../apis/axiosInstance2";
type useInfo = {
    id: number;
    email: string;
};
// 수정
// 유저의 정보를 가져오는 컴포넌트
// token의 type을 string 이거나 null type으로 선언
// 반환값 즉 , return getData.data 의 type을 지정
const QueryUserInfo = async (token: string | null): Promise<useInfo> => {
    try {
        const getData = await axiosInstance2.get("user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(getData);

        return getData.data;
    } catch (error) {
        console.error("유저 정보를 볼러오는 것을 실패했습니다", error);
        throw new Error("Failed to fetch user information");
    }
};

export default QueryUserInfo;
