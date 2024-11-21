import React from 'react';
import styled from 'styled-components';

const UserInfo = ({ user, onLogout }) => {
    return (
        <>
            <GreetingText>{user?.email.split('@')[0]}님 반갑습니다!</GreetingText>
            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </>
    );
};

export default UserInfo;

const GreetingText = styled.div`
    margin-right: 20px;
    color: white;
    font-size: 1rem;
`;

const LogoutButton = styled.button`
    padding: 10px 15px;
    background-color: #f82f62;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #ff547e;
    }
`;
