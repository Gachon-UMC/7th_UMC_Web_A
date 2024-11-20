import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../apis/axios-instance';
import styled from 'styled-components';
import UserInfo from './UserInfo';  // 분리된 컴포넌트 임포트
import AuthButtons from './AuthButtons';  // 분리된 컴포넌트 임포트

const FetchUser = async() => {
    const token = localStorage.getItem("accessToken");
    const response = await axiosInstance.get(`http://localhost:3000/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

    const { data: user, isError } = useQuery({
        queryKey: ['user'],
        queryFn: FetchUser,
        enabled: isLoggedIn, 
        onError: (error) => console.error("유저 정보 불러오기 실패:", error.message),
        retry: false,
    });

    useEffect(() => {
        const handleAuthChange = () => {
            setIsLoggedIn(!!localStorage.getItem("accessToken"));
        };
        window.addEventListener("authChange", handleAuthChange);
        return () => window.removeEventListener("authChange", handleAuthChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        window.dispatchEvent(new CustomEvent("authChange"));
        navigate("/login");
    };

    return (
        <StyledNavbar>
            <NACHA onClick={() => navigate('/')} style={{ cursor: "pointer" }}>NACHA</NACHA>
            <Navbtndiv>
                {isLoggedIn ? (
                    <UserInfo user={user} onLogout={handleLogout} />
                ) : (
                    <AuthButtons />
                )}
            </Navbtndiv>
        </StyledNavbar>
    );
};

export default Navbar;



// CSS
const StyledNavbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    background-color: #232323;
    z-index: 1000;
    padding: 0 20px;
`
const NACHA = styled.div`
    color: #F82F62;
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
`
const Navbtndiv = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
`
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
`
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
`
const GreetingText = styled.div`
    margin-right: 20px;
    color: white;
    font-size: 1rem;
`
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
`