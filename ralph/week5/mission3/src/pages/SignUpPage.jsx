import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
function SignUpPage() {
    const schema = yup.object().shape({
        email: yup
            .string()
            .matches(
                /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
                "올바른 이메일 형식이 아닙니다. 다시 입력해주세요."
            )
            .required("이메일을 꼭 입력해주세요."),
        password: yup
            .string()
            .min(8, "비밀번호는 8자리 이상 입력해주세요")
            .max(16, "비밀번호는 16자리 이하로 입력해주세요")
            .required("비밀번호를 꼭 입력해주세요."),
        checkPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
            .required("비밀번호를 한번 더 입력해 주세요"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const password = useRef(); // 이게 있어서 submit 버튼을 눌렀을 때 결과가 잘 나오고 있는 것

    const onsubmit = (data) => {
        console.log("data", data);
    };

    return (
        <Divmain>
            <form onSubmit={handleSubmit(onsubmit)}>
                <LabelTtile>회원가입</LabelTtile>

                <DivEmailStyle>
                    <InputEmailStyle
                        name="email"
                        type="text"
                        placeholder="이메일"
                        {...register("email")}
                    />
                    <div style={{ color: "red" }}>{errors.email?.message}</div>
                </DivEmailStyle>
                <DivPasswordStyle>
                    <InputPasswordStyle
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        {...register("password")}
                    />
                    <div style={{ color: "red" }}>
                        {errors.password?.message}
                    </div>
                </DivPasswordStyle>
                <DivcheckPasswordStyle>
                    <InputcheckPasswordStyle
                        name="password_confirm"
                        type="password"
                        placeholder="비밀번호 확인"
                        {...register("checkPassword")}
                    />
                    <div style={{ color: "red" }}>
                        {errors.checkPassword?.message}
                    </div>
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
    width: 268px;
    text-align: center;
    margin: 10px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 0.5em;
    background-color: pink;
`;
