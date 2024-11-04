import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <div className="logo" onClick={() => navigate("/")}>
                Moorad
            </div>
            <div className="account">
                {/* todo navigate 설정 */}
                <div className="login" onClick={() => navigate("/login")}>
                    로그인
                </div>
                <div className="signup" onClick={() => navigate("/signup")}>
                    회원가입
                </div>
            </div>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    width: 100%;
    height: 5rem;
    border-bottom: 1px solid white;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > .logo {
        width: 10%;

        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        color: red;
        font-size: 32px;
        text-shadow: -0.5px -0.5px 0 white, /* 왼쪽 위 */ 0.5px -0.5px 0 white,
            /* 오른쪽 위 */ -0.5px 0.5px 0 white,
            /* 왼쪽 아래 */ 0.5px 0.5px 0 white;

        cursor: pointer;
    }

    & > .account {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 20%;
        height: 100%;

        & > div {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            cursor: pointer;
        }

        & > .login {
            width: 30%;
            height: 70%;
            border-radius: 10px;
            border: 1px solid white;
        }

        & > .signup {
            width: 30%;
            height: 70%;
            background-color: red;
            border-radius: 10px;
            border: none;
        }
    }
`;
export default Header;
