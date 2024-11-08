// navbar.jsx

import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error(
            "유저 정보 불러오기 실패:",
            error.response?.data || error.message
          );
        }
      }
    };
    fetchUser();
  }, []);

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
        <Logo to="/">YONGCHA</Logo>
        <ButtonContainer>
          {user ? (
            <>
              {/* 이메일 앞 부분 표시 */}
              <UserNickname>
                {user?.email.split("@")[0]}님 반갑습니다.
              </UserNickname>
              <Logout onClick={handleLogout}>로그아웃</Logout>
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

const Logout = styled(Link)`
  color: white;
  text-decoration: none;
  border-radius: 0.2rem;
  padding-left: 1rem;
  margin-right: 0.8rem;
  &:hover {
    background-color: #222326;
  }
`;
