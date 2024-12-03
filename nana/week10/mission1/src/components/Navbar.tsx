// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../apis/axios-instance';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import AuthButtons from './AuthButtons';

// 유저 데이터 타입 정의
interface User {
  id: number;
  username: string;
  email: string;
  // 필요한 다른 유저 정보들 추가 가능
}

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null); // 유저 정보 상태
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 여부 상태

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
                } catch (error: any) {
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
`;

const NACHA = styled.div`
    color: #F82F62;
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
`;

const Navbtndiv = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
`;