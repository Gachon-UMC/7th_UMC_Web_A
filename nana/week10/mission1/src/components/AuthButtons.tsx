import styled from 'styled-components';

const AuthButtons= () => {
    const handleNavigation = (path: string) => {
        window.location.href = path;
    };

    return (
        <>
            <LoginButton onClick={() => handleNavigation('/login')}>로그인</LoginButton>
            <SignupButton onClick={() => handleNavigation('/signup')}>회원가입</SignupButton>
        </>
    );
};

export default AuthButtons;

// CSS
const LoginButton = styled.button`
    padding: 10px 15px;
    background-color: #282828;
    border: none;
    border-radius: 10px;
    color: white;
    text-decoration: none;

    &:hover {
        background-color: #383838;
    }
`;

const SignupButton = styled.button`
    padding: 10px;
    margin-left: 20px;
    background-color: #F82F62;
    border: none;
    border-radius: 10px;
    color: white;
    text-decoration: none;

    &:hover {
        background-color: #ff547e;
    }
`;