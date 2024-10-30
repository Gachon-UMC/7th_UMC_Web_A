import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

interface Inputs {
    [key: string]: string;
}

const LogIn = () => {
    const schema = z
        .object({
            email: z.coerce
                .string()
                .email({ message: "올바른 이메일 형식이 아닙니다." }),
            password: z.coerce
                .string()
                .min(8, { message: "비밀번호는 8자리 이상이어야 합니다." })
                .max(16, { message: "비밀번호는 16자리 이하여야 합니다." }),
        })
        .required();
    // 이 코드의 문제점은 제출하기 버튼을 누른 이후부터 유효성 검사를 진행한다는 것
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(schema), mode: "onChange" });
    // onBlur , onChange
    // mode 설정을 통해서 시기 결정 가능

    // 문제점 : 아이디만 먼저 입력했을 때 button disabled가 풀려버림 (비밀번호 입력 안했을 때 : focus X)
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    return (
        <LogInContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        type={"text"}
                        placeholder="아이디를 입력하세요."
                        {...register("email", { required: true })}
                    ></Input>
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div>
                    <Input
                        type={"password"}
                        placeholder="비밀번호를 입력하세요."
                        autoComplete="off"
                        {...register("password", { required: true })}
                    ></Input>
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>
                <LoginBtn
                    type="submit"
                    disabled={Object.keys(errors).length === 0 ? false : true}
                >
                    로그인
                </LoginBtn>
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
