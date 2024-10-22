import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const LogInPage = () => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
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
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onsubmit = (data) => {
        console.log("data", data);
    };
    // const [emailvalid, setEmailValid] = useState(false);
    // const [pwvalid, setPwValid] = useState(false);
    // const [notAllow, setNotAllow] = useState(true);

    // useEffect(() => {
    //     if (data.email && data.password) {
    //         setNotAllow(false);
    //         return;
    //     }
    //     setNotAllow(true);
    // }, [emailvalid,pwvalid]);
    return (
        <DivStyle>
            <FormStyle onSubmit={handleSubmit(onsubmit)}>
                <LabelTtile>로그인</LabelTtile>

                <DivEmailStyle>
                    <InputEmailStyle
                        name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        {...register(
                            "email"
                            //     {
                            //     required: true,
                            // }
                        )}
                    />
                    <p style={{ color: "red" }}>{errors.email?.message}</p>
                    {/* {errors.email && errors.email.type === "required" && (
                        <SpanStyle>이메일을 입력해주세요</SpanStyle>
                    )} */}
                </DivEmailStyle>
                <DivPasswordStyle>
                    <InputPasswordStyle
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        {...register("password", {
                            // required: true,
                            // minLength: 8,
                            // maxLength: 16,
                        })}
                    />
                    <p style={{ color: "red" }}>{errors.password?.message}</p>{" "}
                </DivPasswordStyle>

                <ButtonStyle type="submit" id="btn_id">
                    로그인
                </ButtonStyle>
            </FormStyle>
        </DivStyle>
    );
};
export default LogInPage;

{
    /* {errors.password &&
                        errors.password.type === "minLength" && (
                            <SpanStyle>8자리 이상으로 입력해주세요</SpanStyle>
                        )}
                    {errors.password &&
                        errors.password.type === "maxLength" && (
                            <SpanStyle>16자리 이하로 입력해주세요</SpanStyle>
                        )} */
}
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
