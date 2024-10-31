import styled from "styled-components";
import useForm from "../hooks/useForm.js";
import { validateLogin } from "../utils/validate.js";

const LoginPage = () => {
  const login = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const handlePressLogin = () => {
    console.log(login.values.email, login.values.password);
  };

  return (
    <Container>
      <Login>로그인</Login>
      <Input
        error={login.touched.email && login.errors.email}
        type={"email"}
        placeholder="이메일을 입력해 주세요."
        {...login.getTextInputProps("email")}
      />
      {login.touched.email && login.errors.email && (
        <ErrorText>{login.errors.email}</ErrorText>
      )}

      <Input
        error={login.touched.password && login.errors.password}
        type={"password"}
        placeholder="비밀번호를 입력해 주세요."
        {...login.getTextInputProps("password")}
      />
      {login.touched.password && login.errors.password && (
        <ErrorText>{login.errors.password}</ErrorText>
      )}

      <LoginButton onClick={handlePressLogin}>로그인</LoginButton>
    </Container>
  );
};

export default LoginPage;

// CSS
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Login = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
`;

const Input = styled.input`
  margin: 0.5rem 0;
  padding: 0.8rem;
  width: 20rem;
  height: 1.5rem;
  border: 1rem solid #ccc;
  border-radius: 0.5rem;

  border: ${(props) =>
    props.error ? "0.2rem solid red" : "0.2rem solid #ccc"};

  &:focus {
    border-color: #007bff;
  }
`;

const ErrorText = styled.h1`
  margin: 0;
  color: red;
  font-size: 0.8rem;
`;

const LoginButton = styled.button`
  margin: 0.5rem;
  text-decoration: none;
  border-radius: 0.5rem;
  width: 22rem;
  height: 3rem;
`;
