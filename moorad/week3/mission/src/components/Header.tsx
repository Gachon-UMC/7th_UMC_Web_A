import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <HeaerContainer>
            <div className="logo" onClick={() => navigate("/")}>
                Moorad
            </div>
            <div className="account">
                <div className="login" onClick={() => navigate("/signin")}>
                    로그인
                </div>
                <div className="signup" onClick={() => navigate("/signup")}>
                    회원가입
                </div>
            </div>
        </HeaerContainer>
    );
};

const HeaerContainer = styled.header`
    width: 100%;
    height: 80px;
    background-color: gray;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    padding: 0px 10px;

    & > .logo {
        font-size: 24px;
        cursor: pointer;
        border: 1px solid black;
        width: 100px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: red;
    }

    & > .account {
        position: absolute;
        right: 40px;
        width: 200px;
        height: 100%;
        border: 1px solid black;
        display: flex;
        justify-content: space-around;
        align-items: center;

        & > div {
            width: 40%;
            height: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid black;
            color: white;
            cursor: pointer;
        }
        & > .login:hover {
            color: blue;
        }

        & > .signup {
            background-color: red;
            border-radius: 10px;
        }
        & > .signup:hover {
            background-color: white;
            color: red;
            border-radius: 10px;
        }
    }
`;

export default Header;
