import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
const LogInPage = () => {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onsubmit = (data) => {
        console.log("data", data);
    };
    return (
        <DivStyle>
            <FormStyle onSubmit={handleSubmit(onsubmit)}>
                <LabelTtile>로그인</LabelTtile>

                <DivEmailStyle>
                    <InputEmailStyle
                        name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        {...register("email", {
                            required: true,
                        })}
                    />
                    {errors.email && errors.email.type === "required" && (
                        <SpanStyle>이메일을 입력해주세요</SpanStyle>
                    )}
                </DivEmailStyle>
                <DivPasswordStyle>
                    <InputPasswordStyle
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                            maxLength: 16,
                        })}
                    />
                    {errors.password &&
                        errors.password.type === "minLength" && (
                            <SpanStyle>8자리 이상으로 입력해주세요</SpanStyle>
                        )}
                    {errors.password &&
                        errors.password.type === "maxLength" && (
                            <SpanStyle>16자리 이하로 입력해주세요</SpanStyle>
                        )}
                </DivPasswordStyle>

                <ButtonStyle type="submit">로그인</ButtonStyle>
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

const SpanStyle = styled.span`
    color: red;
    width: 250px;
    font-size: 12px;
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
    width: 268px;
    text-align: center;
    margin: 10px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 0.5em;
    background-color: pink;
`;
