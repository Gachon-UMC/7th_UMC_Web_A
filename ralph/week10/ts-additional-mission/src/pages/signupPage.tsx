import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../schemas/signupSchema";
import { axiosInstance } from "../apis/axiosInstance";
import styled from "styled-components";
type SignUpData = { email: string; password: string; role: "user" | "admin" };
function signupPage() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SignUpData>({
        resolver: yupResolver(signupSchema),
    });
    const navigate = useNavigate();

    console.log(errors);

    const onsubmit = async (data: SignUpData) => {
        try {
            const postUserData = await axiosInstance.post("/v1/users", {
                email: data.email,
                password: data.password,
                role: data.role,
            });
            alert("회원가입 성공");
            navigate("/login");
        } catch (error) {
            console.error("Server Error:", error); // 로그로 에러 출력
            alert("회원가입 실패");
        }
    };
    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <SignupDiv>
                <div>회원가입</div>

                <div>
                    <div>
                        <div>아이디</div>
                        <input type="email" {...register("email")} />
                        <div>{errors.email?.message}</div>
                    </div>

                    <div>
                        <div>비밀번호</div>
                        <input type="password" {...register("password")} />
                        <div>{errors.password?.message}</div>
                    </div>

                    <div>
                        <div>역할</div>
                        <input type="role" {...register("role")} />
                        <div>{errors.role?.message}</div>
                    </div>
                </div>

                <div>
                    <button type="submit">가입하기</button>
                </div>
            </SignupDiv>
        </form>
    );
}
export default signupPage;

const SignupDiv = styled.div`
    width: 50vw;
    margin: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
`;
