import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../apis/axios-instance';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import AuthButtons from './AuthButtons';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // 유저 정보를 상태로 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태

    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        // 로그인 여부 확인
        if (token) {
            setIsLoggedIn(true);

            // 유저 정보 불러오기
            const fetchUserData = async () => {
                try {
                    const response = await axiosInstance.get("http://localhost:3000/user/me", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data); // 유저 정보 상태 업데이트
                } catch (error) {
                    console.error("유저 정보 불러오기 실패:", error.response?.data || error.message);
                }
            };

            fetchUserData();
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

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