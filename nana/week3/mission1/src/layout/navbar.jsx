// navbar.jsx
import {Link} from "react-router-dom";
import styled from 'styled-components';

// navbar 기본
const StyledNavbar = styled.nav`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 90px;
    background-color: #232323;
    z-index: 1000; /* 항상 맨 위에 표시되도록 */
`
// NACHA 로고를 div 태그로 정의
const NACHA = styled.div`
    color: #F82F62;
    font-weight: bold;
    font-size: 30px;
    margin-top: 3px;
    padding: 20px;
`
// Navbar 버튼(로그인, 회원가입) div
const Navbtndiv = styled.div`
    Width: 100%
    margin-left: auto;
    margin-top: 30px;
    margin-right: 20px;
`
// 회원가입 버튼 styled-component
const Signupbtn = styled.button`
    padding: 10px;
    margin-left: 20px;
    background-color: #F82F62;
    border: none;
    border-radius: 10px;
    color: white;

    &:hover{
        background-color: #ff547e;
    }
`
// 로그인 버튼 styled-component
const Loginbtn = styled.button`
    padding: 10px 15px;
    background-color: #282828;
    border: none;
    border-radius: 10px;
    color: white;

    &:hover{
        background-color: #383838;
    }
`

const Navbar = () => {
    return (
        <>
            <StyledNavbar>
                {/* NACHA 클릭시 '/'(home)으로 이동 */}
                <Link style={{ textDecoration: "none"}} to={'/'}>
                    <NACHA>NACHA</NACHA> {/* NACHA 로고 생성 */}
                </Link>

                <Navbtndiv>
                    <Link to={'/login'}> {/* 로그인 버튼 클릭 시 /login 페이지로 이동 */}
                        <Loginbtn> {/* 로그인 버튼 생성 */}
                            로그인
                        </Loginbtn>
                    </Link>
                    <Link to={'/signup'}> {/* 회원가입 버튼 클릭 시 /login 페이지로 이동 */}
                        <Signupbtn> {/* 회원가입 버튼 생성 */}
                            회원가입
                        </Signupbtn>
                    </Link>
                </Navbtndiv>
                
            </StyledNavbar>
        </>
    );
};

export default Navbar;
