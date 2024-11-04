import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useEffect } from "react";
const LogInPage = () => {
    const schema = yup.object().shape({
        email: yup
            .string()
            .email()
            .matches(
                /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
                "올바른 이메일 형식이 아닙니다. 다시 입력해주세요."
            )
            .required("이메일을 꼭 입력해주세요."),
        password: yup
            .string()
            .min(8, "비밀번호는 8자리 이상이어야 합니다")
            .max(16, "비밀번호는 16자리 이하여야 합니다")
            .required(),
    });
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onsubmit = (data) => {
        console.log("data", data);
    };
    const emailValue = watch("email");
    const passwordValue = watch("password");
    const [notAllow, setNotAllow] = useState();
    useEffect(() => {
        if (emailValue && passwordValue && isValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [emailValue, passwordValue]);
    return (
        <DivStyle>
            <FormStyle onSubmit={handleSubmit(onsubmit)} novalidate>
                <LabelTtile>로그인</LabelTtile>

                <DivEmailStyle>
                    <InputEmailStyle
                        name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        {...register("email")}
                    />
                    <Pstyle>{errors.email?.message}</Pstyle>
                </DivEmailStyle>
                <DivPasswordStyle>
                    <InputPasswordStyle
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        {...register("password", {})}
                    />
                    <Pstyle>{errors.password?.message}</Pstyle>{" "}
                </DivPasswordStyle>

                <ButtonStyle
                    type="submit"
                    id="btn_id"
                    disabled={notAllow}
                    notAllow={notAllow}
                >
                    로그인
                </ButtonStyle>
            </FormStyle>
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
