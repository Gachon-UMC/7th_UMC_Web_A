import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance2 } from "../apis/axiosInstance2";
import { useNavigate } from "react-router-dom";
import { SignUpSchema } from "../schemas/SignUpSchema";

function SignUpPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SignUpSchema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);

        try {
            const res = await axiosInstance2.post("/auth/register", {
                email: data.email,
                password: data.password,
                passwordCheck: data.checkPassword,
            });
            // "passwordCheck" 말고 checkPassword 이렇게 하면 안됨
            // 그때 무랫님이 말한 서버가 가진 key 값 하고 같은 key 값을 가져야한다는 것을 알 수 있음
            alert("회원가입 성공");
            navigate("/login");
        } catch (error) {
            console.error(
                "회원가입 실패:",
                error.response ? error.response.data : error.message
            );
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    };
    return (
        <Divmain>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <LabelTtile>회원가입</LabelTtile>

                <DivEmailStyle>
                    <InputEmailStyle
                        name="email"
                        type="email"
                        placeholder="이메일"
                        {...register("email")}
                    />
                    <Diverrorstyle>{errors.email?.message}</Diverrorstyle>
                </DivEmailStyle>
                <DivPasswordStyle>
                    <InputPasswordStyle
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        {...register("password")}
                    />
                    <Diverrorstyle>{errors.password?.message}</Diverrorstyle>
                </DivPasswordStyle>
                <DivcheckPasswordStyle>
                    <InputcheckPasswordStyle
                        name="password_confirm"
                        type="password"
                        placeholder="비밀번호 확인"
                        {...register("checkPassword")}
                    />
                    <Diverrorstyle>
                        {errors.checkPassword?.message}
                    </Diverrorstyle>
                </DivcheckPasswordStyle>
                <ButtonStyle type="submit">제출</ButtonStyle>
            </form>
        </Divmain>
    );
}

export default SignUpPage;

//css
const Divmain = styled.div`
    text-align: center;
    margin-top: 10%;
    flex: ;
`;

const LabelTtile = styled.label`
    font-size: 2em;
    color: white;
`;

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

const InputcheckPasswordStyle = styled.input`
    display: flex;
    flexdirection: column;
    width: 250px;
    text-align: center;
    margin: 10px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 0.5em;
`;

const DivcheckPasswordStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
`;

const DivSexStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
`;

const InputSexStyle = styled.input`
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
    width: 268px;
    text-align: center;
    margin: 10px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 0.5em;
    background-color: pink;
`;

const Diverrorstyle = styled.div`
    color: red;
`;
