import styled from "styled-components";
import usePostAccount from "../shared/hooks/usePostAccount";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        errors,
        isValid,
        mutation: handleSignIn,
    } = usePostAccount("signin");

    return (
        <SignInContainer
            onSubmit={handleSubmit((data) => handleSignIn.mutate(data))}
        >
            <h1>로그인</h1>
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
export default SignIn;
