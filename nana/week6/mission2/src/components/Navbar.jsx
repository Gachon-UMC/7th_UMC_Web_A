import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

    useEffect(() => {
        // 로그인/로그아웃 이벤트 리스너 추가
        const handleAuthChange = () => {
            setIsLoggedIn(!!localStorage.getItem("accessToken"));
        };

        window.addEventListener("authChange", handleAuthChange);

        // 초기 유저 정보 불러오기
        if (isLoggedIn) {
            const fetchUserData = async () => {
                try {
                    const token = localStorage.getItem("accessToken");
                    const response = await axios.get("http://localhost:3000/user/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error("유저 정보 불러오기 실패:", error.response?.data || error.message);
                }
            };
            fetchUserData();
        }

        return () => window.removeEventListener("authChange", handleAuthChange);
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setUser(null);
        window.dispatchEvent(new CustomEvent("authChange")); // 로그아웃 이벤트 발행
        navigate("/login");
    };

    return (
        <StyledNavbar>
            <NACHA onClick={() => navigate('/')} style={{ cursor: "pointer" }}>
                NACHA
            </NACHA>

            <Navbtndiv>
                {isLoggedIn ? (
                    <>
                        <GreetingText>{user?.email.split('@')[0]}님 반갑습니다!</GreetingText>
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
