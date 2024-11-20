import styled from "styled-components";
import { schema } from "../shared/schema/signInSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { internalServerInstance } from "../shared/instance/apiInstance";
import { useNavigate } from "react-router-dom";
type signInType = z.infer<typeof schema>;

const SignIn = () => {
    const navigate = useNavigate();

    const handleLogin = useMutation({
        mutationFn: async (data: signInType) =>
            await internalServerInstance.post("/auth/login", data),

        onSuccess: (res) => {
            const token = res.data.accessToken;
            localStorage.setItem("accessToken", token);
            alert("로그인 성공 !");
            navigate("/");
        },
        onError: (err) => {
            console.log(err);
            alert("일치하지 않는 이메일 또는 비밀번호입니다.");
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<signInType>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    return (
        <SignInContainer
            onSubmit={handleSubmit((data) => handleLogin.mutate(data))}
        >
            <input
                type="text"
                placeholder="아이디를 입력하세요."
                {...register("email", { required: true })}
            />
            {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                {...register("password", { required: true })}
            />
            {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            <SubmitButton type="submit" disabled={!isValid}>
                로그인
            </SubmitButton>
        </SignInContainer>
    );
};

const SignInContainer = styled.form`
    width: 100%;
    height: calc(100vh - 12vh);
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    & > input {
        width: 40%;
        height: 3rem;
        padding: 0rem 1rem;
        border-radius: 10px;
    }
`;

const SubmitButton = styled.button`
    width: 20%;
    height: 3rem;
    border-radius: 10px;
    border: none;
    background-color: ${(props) => (props.disabled ? "gray" : "red")};
    color: white;
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};

    &:not([disabled]):hover {
        background-color: white;
        color: red;
    }
`;
const ErrorMessage = styled.span`
    color: red;
    font-size: 1.3rem;
`;
export default SignIn;
