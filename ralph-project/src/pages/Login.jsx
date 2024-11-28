import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstance2 } from "../apis/axiosInstance2.js";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../schemas/LoginSchema.js";
const LogInPage = () => {
    // yup의 object를 통해 schema 의 shape를 만들어 준다.
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });
    // yupResolver 는 Yup 스키마를 react-hook-form 이 이해할 수 있는 방식으로 변환해 주는 함수
    // useForm의 resolver 옵션에 yupResolver(schema)를 전달하면, 폼이 제출될 때 schema의 규칙에 따라 입력값을 자동으로 검증

    // isValid : 현재 폼 값이 모든 유효성 검사 규칙을 통과했는지 여부를 나타낸다
    // errors : 현재 폼의 각 필드에서 반환된 유효성 검사 오류 메시지가 저장된다.
    // console.log(errors);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    // props로 data 라는 객체를 받는데 이때 data
    // handleSubmit 함수: handleSubmit은 폼의 유효성을 검사한 후, 모든 필드 값이 유효하면 onsubmit 함수가 호출되도록 합니다. 이때 폼의 데이터가 data라는 객체로 onsubmit 함수에 전달
    const onsubmit = async (data) => {
        console.log(data);

        // post 메서드로 인증 요청
        try {
            const response = await axiosInstance2.post("/auth/login", {
                email: data.email,
                password: data.password,
            });
            const { accessToken, refreshToken } = response.data;
            console.log(response.data.accessToken);

            // 로컬스토리지에 토큰 저장
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            // API 요청이 성공하면 할 일 (예: 사용자에게 메시지 표시, 페이지 이동)
            // navigate("/");
            alert("로그인 성공!");
            navigate("/");
            setIsLoggedIn(true);
        } catch (error) {
            // 에러가 발생했을 때 처리
            console.error(
                "로그인 실패:",
                error.response ? error.response.data : error.message
            );
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // email 과 password 상태 변화를 실시간 감지
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

    // 여기서 문제가 있는데 form 태그에서 type을 onsubmit 으로 해서 하면

    //handleSubmit(onSubmit)은 폼 제출 시 onSubmit 함수를 호출하며, 이때 폼의 모든 입력 데이터가 유효할 경우에만 onSubmit이 실행
    // <form> 태그의 noValidate 속성은 폼 데이터(form data)를 서버로 제출할 때 해당 데이터의 유효성을 검사하지 않음을 명시
    return (
        <DivStyle>
            {!isLoggedIn ? (
                <FormStyle onSubmit={handleSubmit(onsubmit)} noValidate>
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

                    <ButtonStyle type="submit" id="btn_id" disabled={notAllow}>
                        로그인
                    </ButtonStyle>
                </FormStyle>
            ) : (
                <></>
            )}
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
