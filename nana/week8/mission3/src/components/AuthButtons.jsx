import React from 'react';
import styled from 'styled-components';

const AuthButtons = () => {
    return (
        <>
            <Loginbtn onClick={() => window.location.href = '/login'}>로그인</Loginbtn>
            <Signupbtn onClick={() => window.location.href = '/signup'}>회원가입</Signupbtn>
        </>
    );
};

export default AuthButtons;

const Loginbtn = styled.button`
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

const Signupbtn = styled.button`
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
