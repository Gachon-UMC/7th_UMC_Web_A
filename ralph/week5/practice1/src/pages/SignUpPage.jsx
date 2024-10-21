import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
function SignUpPage() {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const password = useRef(); // 이게 있어서 submit 버튼을 눌렀을 때 결과가 잘 나오고 있는 것
    password.current = watch("password");
    const onsubmit = (data) => {
        console.log("data", data);
    };

    return (
        <Divmain>
            <form onSubmit={handleSubmit(onsubmit)}>
                <Divbody>
                    <input
                        name="email"
                        type="email"
                        placeholder="이메일"
                        {...register("email", {
                            required: true,
                        })}
                    />
                    {errors.email && (
                        <p style={{ color: "white" }}>이메일 다시 써줘</p>
                    )}

                    <input
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                            maxLength: 16,
                        })}
                    />
                    {errors.password && errors.password.type === "required" && (
                        <p style={{ color: "white" }}>
                            비민번호를 입력해주세요
                        </p>
                    )}
                    {errors.password &&
                        errors.password.type === "minLength" && (
                            <p style={{ color: "white" }}>
                                비밀번호는 8자리 이상이어야 합니다.
                            </p>
                        )}
                    {errors.password &&
                        errors.password.type === "maxLength" && (
                            <p style={{ color: "white" }}>
                                비밀번호는 16자리 이하이어야 합니다.
                            </p>
                        )}

                    <Divinput
                        name="password_confirm"
                        type="password"
                        placeholder="비밀번호 확인"
                        {...register("password_confirm", {
                            required: true,
                            validate: (value) => value === password.current,
                        })}
                    />
                    {errors.password_confirm &&
                        errors.password_confirm.type === "required" && (
                            <p style={{ color: "white" }}>
                                비민번호를 입력해주세요
                            </p>
                        )}
                    {errors.password_confirm &&
                        errors.password_confirm.type === "validate" && (
                            <div style={{ color: "white" }}>
                                비밀번호 맞지 않음
                            </div>
                        )}

                    <button type="submit">제출</button>
                </Divbody>
            </form>
        </Divmain>
    );
}

export default SignUpPage;

//css
const Divmain = styled.div`
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Spoqa Han Sans Neo", "sans-serif";
`;

const Divbody = styled.div`
box-sizing:border-box
display=flex;   
flex-direction:column;
align-items:center;
justify-content:centerl
width:100vw;
height:100vh;

`;
const Divinput = styled.input`
    border-color: red;
`;
