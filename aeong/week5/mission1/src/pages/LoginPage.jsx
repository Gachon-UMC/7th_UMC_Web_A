import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginPage = () => {
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

  const onSubmit = (data) => {
    console.log("폼 데이터 제출");
    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Login>로그인</Login>
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
        <LoginButton type="submit" disabled={!isValid}>
          로그인
        </LoginButton>
      </form>
    </Container>
  );
};

export default LoginPage;

// CSS
const Container = styled.div`
  width: 85vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
`;

const Login = styled.h2`
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

const LoginButton = styled.button`
  color: white;
  background-color: ${(props) => (props.disabled ? "gray" : "#f82f62")};
  text-decoration: none;
  border-radius: 0.5rem;
  width: 20.5rem;
  height: 2.5rem;
`;
