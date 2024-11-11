import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // 유저 정보를 상태로 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태

    useEffect(() => {
        // 로그인 여부 확인
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);

            // 유저 정보 불러오기
            const fetchUserData = async () => {
                try {
                    const response = await axios.get("http://localhost:3000/user/me", {
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
    }, []);

    const handleLogout = () => {
        // 로컬스토리지에서 토큰 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        navigate("/login"); // 로그인 페이지로 리디렉션
    };

    return (
        <StyledNavbar>
            <NACHA onClick={() => navigate('/')} style={{ cursor: "pointer" }}>
                NACHA
            </NACHA>

            <Navbtndiv>
                {isLoggedIn ? (
                    <>
                        {/* 유저 닉네임(이메일 @ 앞부분)과 "님 반갑습니다" 메시지 */}
                        <GreetingText>{user?.email.split('@')[0]}님 반갑습니다!</GreetingText>
                        {/* 로그아웃 버튼 */}
                        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                    </>
                ) : (
                    <>
                        <Loginbtn onClick={() => navigate('/login')} style={{ cursor: "pointer" }}>
                            로그인
                        </Loginbtn>
                        <Signupbtn onClick={() => navigate('/signup')} style={{ cursor: "pointer" }}>
                            회원가입
                        </Signupbtn>
                    </>
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
