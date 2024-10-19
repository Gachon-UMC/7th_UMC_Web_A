// navbar.jsx
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavBar>
        <Logo to="/">YONGCHA</Logo>
        <ButtonContainer>
          <Login to="/login">로그인</Login>
          <Signup to="/signup">회원가입</Signup>
        </ButtonContainer>
      </NavBar>
    </nav>
  );
};

export default Navbar;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 10px;
  border-bottom: 1px solid #1b1c1d;
`;

const Logo = styled(Link)`
  color: #f82f62;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
`;

const ButtonContainer = styled.div``;

const Login = styled(Link)`
  color: white;
  text-decoration: none;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
  &:hover {
    background-color: #222326;
  }
`;
const Signup = styled(Link)`
  color: white;
  background-color: #f82f62;
  text-decoration: none;
  border-radius: 5px;
  padding: 5px;
  &:hover {
    background-color: #f6407a;
  }
`;
