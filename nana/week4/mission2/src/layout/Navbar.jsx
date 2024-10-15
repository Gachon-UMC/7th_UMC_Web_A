import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Navbar = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    return (
        <StyledNavbar>
            <NACHA onClick={() => navigate('/')} style={{ cursor: "pointer" }}>
                NACHA
            </NACHA>

            <Navbtndiv>
                <Loginbtn onClick={() => navigate('/login')} style={{ cursor: "pointer" }}>
                    로그인
                </Loginbtn>
                <Signupbtn onClick={() => navigate('/signup')} style={{ cursor: "pointer" }}>
                    회원가입
                </Signupbtn>
            </Navbtndiv>
        </StyledNavbar>
    );
};

export default Navbar;

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