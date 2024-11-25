import styled from "styled-components";
import usePostAccount from "../shared/hooks/usePostAccount";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        errors,
        isValid,
        mutation: handleSignUp,
    } = usePostAccount("signup");

    return (
        <SignUpContainer
            onSubmit={handleSubmit((data) => handleSignUp.mutate(data))}
        >
            <h1>회원가입</h1>
            <input
                placeholder="이메일을 입력하세요."
                type="text"
                {...register("email")}
            ></input>
            {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            <input
                placeholder="비밀번호를 입력하세요."
                type="password"
                {...register("password")}
            ></input>
            {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            <input
                placeholder="비밀번호 확인을 입력하세요."
                type="password"
                {...register("passwordCheck")}
            ></input>
            {errors.passwordCheck && (
                <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>
            )}
            <SubmitButton type="submit" disabled={!isValid}>
                회원가입
            </SubmitButton>
        </SignUpContainer>
    );
};

const SignUpContainer = styled.form`
    width: 100%;
    height: calc(100vh - 12vh);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    & > h1 {
        font-size: 2rem;
    }

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
export default SignUp;
