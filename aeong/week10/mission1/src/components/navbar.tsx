// navbar.tsx

import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// User 타입 지정
interface User {
  email: string;
}

const Navbar = () => {
  // 'user' state 타입 지정
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error: any) {
          // error 타입 지정

          console.error(
            "유저 정보 불러오기 실패:",
            error.response?.data || error.message
          );
          alert("로그인 정보를 불러올 수 없습니다. 다시 시도해 주세요.");
        }
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    // 로컬스토리지에 토큰 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // 유저 정보 상태 초기화
    setUser(null);

    // 로그아웃 후 로그인 페이지로 이동
    navigate("/login");
  };

  return (
    <nav>
      <NavBar>
        <Logo to="/">ONGCHA</Logo>
        <ButtonContainer>
          {user ? (
            <>
              {/* 이메일 앞 부분 표시 */}
              <UserNickname>
                {user?.email.split("@")[0]}님 반갑습니다.
              </UserNickname>
              {/* Logout은 버튼으로 변경하여 onClick 이벤트를 처리 */}
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          ) : (
            <>
              <Login to="/login">로그인</Login>
              <Signup to="/signup">회원가입</Signup>
            </>
          )}
        </ButtonContainer>
      </NavBar>
    </nav>
  );
};

export default Navbar;

// CSS
const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 0.8rem;
  border-bottom: 0.1rem solid #1b1c1d;
`;

const Logo = styled(Link)`
  color: #f82f62;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Login = styled(Link)`
  color: white;
  text-decoration: none;
  border-radius: 0.2rem;
  padding: 0.2rem;
  margin-right: 1rem;
  &:hover {
    background-color: #222326;
  }
`;

const Signup = styled(Link)`
  color: white;
  background-color: #f82f62;
  text-decoration: none;
  border-radius: 0.2rem;
  padding: 0.2rem;
  &:hover {
    background-color: #f6407a;
  }
`;

const UserNickname = styled.div`
  color: white;
`;

// Logout을 button으로 변경하여 onClick 이벤트를 처리
const LogoutButton = styled.button`
  color: white;
  background: none;
  text-decoration: none;
  border: none;
  padding-left: 1rem;
  margin-right: 0.8rem;
  cursor: pointer;
  &:hover {
    background-color: #222326;
  }
`;
