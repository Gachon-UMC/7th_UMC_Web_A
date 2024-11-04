// loginpage.jsx
import styled from 'styled-components';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// 로그인 페이지 컴포넌트 생성
const LoginPage = () => {
    // 유효성 검사 스키마를 생성합니다.
    const schema = yup.object().shape({
        email: yup
            .string()
            .email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!') // 명확하게 지정
            .required('이메일을 입력해주세요!'),  // 명확하게 지정
        password: yup
            .string()
            .min(8, '비밀번호는 8 ~ 16자 사이로 입력해주세요!')
            .max(16, '비밀번호는 8 ~ 16자 사이로 입력해주세요!')
            .required('비밀번호를 입력해주세요!'), // 명확한 비밀번호 오류 메시지
    });
    
    // useForm
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <PageContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextH1>로그인</TextH1>

                <InputEmail placeholder="이메일을 입력해주세요!" 
                            type={'email'} 
                            {...register("email")}/>
                <p style={{color: 'red'}}>{errors.email?.message}</p>

                <InputPassword placeholder="비밀번호를 입력해주세요!" 
                            type={'password'} 
                            {...register("password")}/>
                <p style={{color: 'red'}}>{errors.password?.message}</p>

                <InputSubmit 
                    type={'submit'} 
                    value={"로그인"}
                    disabled={!isValid} />
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
const InputSubmit = styled.input`
    padding: 1rem;
    width: 22rem;
    border-radius: 0.5rem;
    border-style: none;
    background-color: ${({ disabled }) => (disabled ? 'gray' : '#F82F62')};
    color: white;
    font-size: 1rem;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        background-color: ${({ disabled }) => (disabled ? 'gray' : '#ff547e')};
    }
`