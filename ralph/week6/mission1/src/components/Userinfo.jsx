// import React from "react";
// import { useEffect, useState } from "react";
// import { axiosInstance2 } from "../apis/axiosInstance2";
// function Userinfo() {
//     const [userInfo, setUserInfo] = useState(null);
//     const [error, setError] = useState(null);
//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             try {
//                 // localStorage에서 AccessToken 가져오기
//                 const accessToken = localStorage.getItem("accessToken");
//                 console.log(accessToken);

//                 if (!accessToken) {
//                     throw new Error(
//                         "AccessToken이 존재하지 않습니다. 로그인 후 시도해주세요."
//                     );
//                 }

//                 // 유저 정보 요청 보내기
//                 const response = await axiosInstance2.get("/user/me", {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });
//                 console.log(response.data);

//                 // 유저 정보 상태에 저장
//                 setUserInfo(response.data);
//             } catch (err) {
//                 console.error("유저 정보 불러오기 실패:", err);
//                 setError("유저 정보를 불러오는 데 실패했습니다.");
//             }
//         };

//         fetchUserInfo();
//     }, []);

//     if (error) {
//         return <div>{error}</div>;
//     }
//     if (!userInfo) {
//         return <div>로딩 중...</div>;
//     }
//     return [userInfo];
// }

// export default Userinfo;
