// import { SubmitHandler, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

import useForm from "../hooks/useForm";
import styled from "styled-components";
import validateLogin from "../utils/validate";

// useForm 훅 이용 버전
const LogIn = () => {
    const login = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateLogin,
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <LogInContainer>
            <form onSubmit={onSubmit}>
                <Input
                    type={"email"}
                    placeholder="이메일을 입력하세요."
                    {...login.getTextInputProps("email")}
                ></Input>
                {login.touched.email && login.errors.email && (
                    <span>{login.errors.email}</span>
                )}
                <Input
                    type={"password"}
                    placeholder="비밀번호를 입력하세요."
                    {...login.getTextInputProps("password")}
                ></Input>
                {login.touched.password && login.errors.password && (
                    <span>{login.errors.password}</span>
                )}

                <LoginBtn type="submit">로그인</LoginBtn>
            </form>
        </LogInContainer>
    );
};

const LoginBtn = styled.button`
    width: 21rem;
    height: 3rem;
    border-radius: 7px;
    background-color: ${(props) => (props.disabled ? "gray" : "red")};
    color: white;
    font-size: 1.5rem;
    border: none;

    cursor: pointer;

    &:hover {
        background-color: ${(props) =>
            !props.disabled && "rgba(0, 233, 0, 0.7)"};
    }
`;
const LogInContainer = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > form {
        width: 70%;
        height: 50%;
        display: flex;
        flex-direction: column;
        border: 1px solid red;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        & > div {
            display: flex;
            flex-direction: column;

            & > span {
                margin-top: 0.5rem;
            }
        }
    }
`;

const Input = styled.input`
    width: 20rem;
    height: 2rem;
    padding: 0px 5px;
    border-radius: 7px;
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 0.8rem;
`;
export default LogIn;
