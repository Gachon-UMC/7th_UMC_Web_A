import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../apis/axiosInstance";
import styled from "styled-components";
import Cookies from "js-cookie";
import { loginSchema } from "../schemas/loginSchema";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};

export type User = {
    password?: string;
    email?: string;
    accessToken?: string;
    refreshToken?: string;
};

function loginPage() {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    // 수정
    // type을 boolen으로 선언
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    // 수정
    // data 라는 변수의 type을 User 선언
    // UserTypes 컴포넌트에 저장되어 있음
    const onsubmit = async (data: User) => {
        console.log(data);

        // 수정
        // const response = await axiosInstance2.post<LoginResponse> 이건
        // 내가 const { accessToken, refreshToken } = response.data; 이 값을 받는데 받는 값의 type을 지정해주는 것
        // 굳이 type을 선언을 하지 않아도 동작은 하지만 그럼 typescript 를 쓰는 의미가 없어진다.
        try {
            const response = await axiosInstance.post(
                "/v1/auth/login",
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    withCredentials: true, // 쿠키 전송 활성화
                }
            );
            console.log(response);

            alert("로그인 성공!");
            navigate("/");
            setIsLoggedIn(true);

            // 수정
            // 에러 type은 unknown 으로 설정
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Axios 에러:", error.response?.data);
            } else {
                console.error("일반 에러:", error);
            }
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const emailValue = watch("email");
    const passwordValue = watch("password");

    // 수정
    // 여기서 <boolean>으로 type 설정해 줘야 setNotAllow(false), setNotAllow(true) 이것들이 가능하다.
    const [notAllow, setNotAllow] = useState<boolean>();
    useEffect(() => {
        if (emailValue && passwordValue && isValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [emailValue, passwordValue]);

    return (
        <DivStyle>
            <FormStyle onSubmit={handleSubmit(onsubmit)} noValidate>
                <LabelTtile>로그인</LabelTtile>

                <DivEmailStyle>
                    <InputEmailStyle
                        // name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        {...register("email")}
                    />
                    <Pstyle>{errors.email?.message}</Pstyle>
                </DivEmailStyle>
                <DivPasswordStyle>
                    <InputPasswordStyle
                        // name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        {...register("password", {})}
                    />
                    <Pstyle>{errors.password?.message}</Pstyle>{" "}
                </DivPasswordStyle>

                <button type="submit" id="btn_id" disabled={notAllow}>
                    로그인
                </button>
            </FormStyle>
        </DivStyle>
    );
}
export default loginPage;

//css

//css
const DivStyle = styled.div`
    text-align: center;
    margin-top: 10%;
    flex: ;
`;

const LabelTtile = styled.label`
    font-size: 2em;
    color: white;
`;

const FormStyle = styled.form``;

const DivEmailStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2em;
`;

const InputEmailStyle = styled.input`
    display: flex;
    flexdirection: column;
    width: 250px;
    text-align: center;
    margin: 10px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 0.5em;
`;

const DivPasswordStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
`;

const InputPasswordStyle = styled.input`
    display: flex;
    flexdirection: column;
    width: 250px;
    text-align: center;
    margin: 10px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 0.5em;
`;

// const ButtonStyle = styled.button`
//     background-color: ${(props) => (props.notAllow ? "gray" : "pink")};
//     width: 268px;
//     text-align: center;
//     margin: 10px;
//     padding: 8px;
//     border: 1px solid black;
//     border-radius: 0.5em;
// `;

const Pstyle = styled.p`
    color: red;
`;
