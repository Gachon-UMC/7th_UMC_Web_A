import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstance2 } from "../apis/axiosINsta";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../schemas/LoginSchema.js";
import { User } from "../types/userTypes.js";
import axios from "axios";

type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};

const LogInPage = () => {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(LoginSchema),
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
            const response = await axiosInstance2.post<LoginResponse>(
                "/auth/login",
                {
                    email: data.email,
                    password: data.password,
                }
            );
            const { accessToken, refreshToken } = response.data;
            console.log(response.data.accessToken);

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

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
            {!isLoggedIn ? (
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

                    <ButtonStyle type="submit" id="btn_id" disabled={notAllow}>
                        로그인
                    </ButtonStyle>
                </FormStyle>
            ) : (
                <></>
            )}
        </DivStyle>
    );
};
export default LogInPage;

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

const ButtonStyle = styled.button`
    background-color: ${(props) => (props.notAllow ? "gray" : "pink")};
    width: 268px;
    text-align: center;
    margin: 10px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 0.5em;
`;

const Pstyle = styled.p`
    color: red;
`;
