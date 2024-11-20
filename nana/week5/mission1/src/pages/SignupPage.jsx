// signuppage.jsx

import styled from 'styled-components';
import useForm from '../hooks/useForm';
import {validateLogin} from '../utils/validate';

// 회원가입 페이지 컴포넌트
const SignUpPage = () => {

    // useForm
    const signup = useForm({
        initialValue: {
            email: '',          // 이메일 입력 초기 값
            password: '',       // 비밀번호 입력 초기 값
            passwordcheck: '',  // 비밀번호 확인 입력 초기 값
        },
        validate: validateLogin // 유효성 검증 함수
    })

    // 제출 버튼 클릭 시 호출되는 함수
    const handlePressLogin = () => {
        console.log(signup.values);
        //console.log(login.values.passwordcheck);
        signup.setValues({
            email: '',
            password: '',
            passwordcheck: ''
        })
    }
    
    //console.log(signup.getTextInputProps)
    //console.log(signup.touched)

    return (
        <PageContainer>
            <Form>
                <TextH1>회원가입</TextH1>

                <InputEmail 
                    type="email" 
                    placeholder="이메일을 입력해주세요!" 
                    {...signup.getTextInputProps('email')}
                />
                {/* 이메일 필드가 터치되고 에러가 있을 경우 오류 메시지 표시 */}
                {signup.touched.email && signup.errors.email && <ErrorText>{signup.errors.email}</ErrorText>} 

                <InputPassword 
                    type="password" 
                    placeholder="비밀번호를 입력해주세요!" 
                    {...signup.getTextInputProps('password')}
                />
                {/* 비밀번호 필드가 터치되고 에러가 있을 경우 오류 메시지 표시 */}
                {signup.touched.password && signup.errors.password && <ErrorText>{signup.errors.password}</ErrorText>} 
                
                <PasswordCheck 
                    type="password" 
                    placeholder="비밀번호를 다시 입력해주세요!"
                    {...signup.getTextInputProps('passwordcheck')}
                />
                {/* 비밀번호 확인 필드가 터치되고 에러가 있을 경우 오류 메시지 표시 */}
                {signup.touched.passwordcheck && signup.errors.passwordcheck && <ErrorText>{signup.errors.passwordcheck}</ErrorText>}

                <SignUpButton 
                    type='button' 
                    onClick={handlePressLogin} 
                    disabled={signup.errors.email || signup.errors.password || signup.errors.passwordcheck}
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
const PasswordCheck = styled.input`
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
`