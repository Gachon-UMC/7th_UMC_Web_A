// SignupPage.jsx

import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const schema = yup.object().shape({
    // 에러 메세지 커스텀
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다. 다시 확인해 주세요")
      .required("이메일을 반드시 입력해 주세요."),

    // 문자열, 최소 8자, 최대 16자, 필수 입력
    password: yup
      .string()
      .min(8, "비밀번호는 8 ~ 16자 사이로 입력해 주세요!")
      .max(16, "비밀번호는 8 ~ 16자 사이로 입력해 주세요!")
      .required("비밀번호를 반드시 입력해 주세요."),

    passwordCheck: yup
      .string()
      // ref 기능을 이용해 두 필드를 연결
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 검증 또한 필수 입력요소입니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    // 실시간 유효성 검사
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/auth/register", {
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck,
      });
      // 회원가입 후 로그인 페이지로 이동
      navigate("/login");
    } catch (error) {
      // 오류 처리 추가
      console.error("회원가입 실패:", error.response?.data || error.message);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SignUp>회원가입</SignUp>

        <Input
          type={"email"}
          placeholder="이메일을 입력해 주세요."
          {...register("email")}
        />
        <p style={{ color: "red", fontSize: "0.8rem" }}>
          {errors.email?.message}
        </p>

        <Input
          type={"password"}
          placeholder="비밀번호를 입력해 주세요."
          {...register("password")}
        />
        <p style={{ color: "red", fontSize: "0.8rem" }}>
          {errors.password?.message}
        </p>

        <Input
          type={"password"}
          placeholder="비밀번호를 다시 입력해 주세요."
          {...register("passwordCheck")}
        />
        <p style={{ color: "red", fontSize: "0.8rem" }}>
          {errors.passwordCheck?.message}
        </p>

        <Button type="submit" disabled={!isValid}>
          제출
        </Button>
      </form>
    </Container>
  );
};

export default SignUpPage;

// CSS
const Container = styled.div`
  width: 85vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignUp = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
`;

const Input = styled.input`
  width: 20rem;
  height: 2rem;
  border-radius: 0.5rem;
`;

const Button = styled.button`
  color: white;
  background-color: ${(props) => (props.disabled ? "gray" : "#f82f62")};
  text-decoration: none;
  border-radius: 0.5rem;
  width: 20.5rem;
  height: 2.5rem;
`;
