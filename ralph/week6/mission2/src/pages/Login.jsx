import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useEffect } from "react";
const LogInPage = () => {
    // yup의 object를 통해 schema 의 shape를 만들어 준다.
    const schema = yup.object().shape({
        email: yup
            .string()
            .email()
            .required("이메일을 꼭 입력해주세요.")
            // 정규식을 쓸 때는 matches 메소드 사용
            .matches(
                /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
                "올바른 이메일 형식이 아닙니다. 다시 입력해주세요."
            ),
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
    // yupResolver 는 Yup 스키마를 react-hook-form 이 이해할 수 있는 방식으로 변환해 주는 함수
    // useForm의 resolver 옵션에 yupResolver(schema)를 전달하면, 폼이 제출될 때 schema의 규칙에 따라 입력값을 자동으로 검증

    // isValid : 현재 폼 값이 모든 유효성 검사 규칙을 통과했는지 여부를 나타낸다
    // errors : 현재 폼의 각 필드에서 반환된 유효성 검사 오류 메시지가 저장된다.
    console.log(errors);

    const onsubmit = (data) => {
        console.log("data", data);
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
    // <form> 태그의 novalidate 속성은 폼 데이터(form data)를 서버로 제출할 때 해당 데이터의 유효성을 검사하지 않음을 명시
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

                <ButtonStyle type="submit" id="btn_id" disabled={notAllow}>
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
