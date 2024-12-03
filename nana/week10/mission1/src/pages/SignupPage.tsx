import styled from 'styled-components';
import useForm from '../hooks/useForm';
import { validateLogin } from '../utils/validate';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
  passwordcheck: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();

  const signup = useForm<FormValues>({
    initialValue: {
      email: '',
      password: '',
      passwordcheck: '',
    },
    validate: validateLogin,
  });

  const handlePressSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        email: signup.values.email,
        password: signup.values.password,
        passwordCheck: signup.values.passwordcheck,
      });

      console.log('회원가입 성공:', response.data);
      signup.resetForm();
      navigate('/login');
    } catch (error: unknown) {
      // error를 AxiosError로 타입 단언
      if (axios.isAxiosError(error)) {
        console.error('회원가입 실패:', error.response?.data || error.message);
      } else {
        console.error('회원가입 중 알 수 없는 오류 발생:', error);
      }
    }
  };

  return (
    <PageContainer>
      <Form>
        <TextH1>회원가입</TextH1>

        <StyledInput 
          type="email" 
          placeholder="이메일을 입력해주세요!" 
          {...signup.getTextInputProps('email')}
        />
        {signup.touched.email && signup.errors.email && <ErrorText>{signup.errors.email}</ErrorText>}

        <StyledInput 
          type="password" 
          placeholder="비밀번호를 입력해주세요!" 
          {...signup.getTextInputProps('password')}
        />
        {signup.touched.password && signup.errors.password && <ErrorText>{signup.errors.password}</ErrorText>}

        <StyledInput 
          type="password" 
          placeholder="비밀번호를 다시 입력해주세요!"
          {...signup.getTextInputProps('passwordcheck')}
        />
        {signup.touched.passwordcheck && signup.errors.passwordcheck && <ErrorText>{signup.errors.passwordcheck}</ErrorText>}

        <SignUpButton 
          type="button" 
          onClick={handlePressSignUp} 
          disabled={Boolean(signup.errors.email || signup.errors.password || signup.errors.passwordcheck)}
        >제출</SignUpButton>
      </Form>
    </PageContainer>
  );
};

export default SignUpPage;

// CSS
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;    
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-radius: 0.5rem;
`;
const TextH1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  margin-top: 6rem;
`;
const StyledInput = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  border-style: none;
  width: 20rem;
  &::placeholder {
    font-size: 1rem;
  }
`;
const ErrorText = styled.h1`
  margin: 0;
  color: red;
  font-size: 0.8rem;
`;
const SignUpButton = styled.button`
  padding: 1rem;
  width: 22rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #f82f62;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff547e;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
