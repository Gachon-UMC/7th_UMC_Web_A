import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schemas/loginSchema";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { userInstance } from "../apis/getUserAPI";
import { useSetRecoilState } from "recoil";
import { loginState } from "../recoil/loginState";

type loginType = z.infer<typeof schema>;

const LogIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<loginType>({ resolver: zodResolver(schema), mode: "onChange" });

    const setIsLoggedIn = useSetRecoilState(loginState);

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<loginType> = async (data) => {
        try {
            const res = await userInstance.post("/auth/login", data);
            const token = res.data.accessToken;
            localStorage.setItem("accessToken", token);
            setIsLoggedIn(true);
            alert("로그인이 완료되었습니다.");
            navigate("/");
        } catch (err) {
            alert("올바르지 않은 이메일 혹은 비밀번호입니다.");
        }
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
                {/* isValid를 이용하면 굳이 굳이 Object.keys() 어쩌구 해서 사용할 필요 없음 */}
                <LoginBtn type="submit" disabled={!isValid}>
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

    cursor: ${(props) => (props.disabled ? "default" : "pointer")};

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
