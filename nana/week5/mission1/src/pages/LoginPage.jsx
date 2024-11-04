// loginpage.jsx
import styled from 'styled-components';
import useForm from '../hooks/useForm';
import {validateLogin} from '../utils/validate';

// 로그인 페이지 컴포넌트
const LoginPage = () => {

    // useForm
    const login = useForm({
        initialValue: {
            email: '',      // 이메일 초기 값
            password: '',   // 비밀번호 초기 값
        },
        validate: validateLogin // 유효성 검증 함수
    })

    // 로그인 버튼을 클릭했을 때 호출되는 함수
    const handlePressLogin = () => {
        console.log(login.values);
                
        // 초기화
        login.setValues({
            email: '',      // 로그인 시 입력 필드 초기화
            password: ''
        })
    }
    
    //console.log(login.getTextInputProps)
    //console.log(login.touched)

    return (
        <PageContainer>
            <Form>
                <TextH1>로그인</TextH1>

                <InputEmail 
                    type="email" 
                    placeholder="이메일을 입력해주세요!" 
                    {...login.getTextInputProps('email')}
                />
                {/* 이메일 필드가 터치되고 에러가 있을 경우 오류 메시지 표시 */}
                {login.touched.email && login.errors.email && <ErrorText>{login.errors.email}</ErrorText>} 

                <InputPassword 
                    type="password" 
                    placeholder="비밀번호를 입력해주세요!" 
                    {...login.getTextInputProps('password')}
                />
                {/* 비밀번호 필드가 터치되고 에러가 있을 경우 오류 메시지 표시 */}
                {login.touched.password && login.errors.password && <ErrorText>{login.errors.password}</ErrorText>} 
                
                <LoginButton 
                    type='button' 
                    onClick={handlePressLogin} 
                    disabled={login.errors.email || login.errors.password}
                >로그인</LoginButton>
            </Form>
        </PageContainer>
    );
};

export default LoginPage;



// CSS
const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    border-radius: 0.5rem;
`
const TextH1 = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 2rem;
    margin-top: 6rem;
`
const InputEmail = styled.input`
    padding: 1rem;
    border-radius: 0.5rem;
    border-style: none;
    width: 20rem;
    &::placeholder {
        font-size: 1rem;
    }
`
const InputPassword = styled.input`
    padding: 1rem;
    border-radius: 0.5rem;
    width: 20rem;
    border-style: none;
    &::placeholder {
        font-size: 1rem;
    }
`
const ErrorText = styled.h1`
    margin: 0;
    color: red;
    font-size: 0.8rem;
`
const LoginButton = styled.button`
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
`