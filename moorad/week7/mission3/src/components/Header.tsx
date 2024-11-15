import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../recoil/loginState";
import { useQuery } from "@tanstack/react-query";
import { userInstance } from "../apis/getUserAPI";

const getUserName = async () => {
    const res = await userInstance.get("/user/me", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });

    const name = res.data.email.split("@")[0];
    return name;
};

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(loginState);
    // todo : isLoggedIn일 때 , useQuery 날릴 수 있게

    const { data: userName, isLoading } = useQuery({
        queryKey: ["userInfo"],
        queryFn: () => getUserName(),
        enabled: isLoggedIn,
    });

    return (
        <HeaderContainer>
            <div className="logo" onClick={() => navigate("/")}>
                Moorad
            </div>
            {!isLoading && isLoggedIn ? (
                <LoggedInHeader userName={userName}></LoggedInHeader>
            ) : (
                <LoggedOutHeader></LoggedOutHeader>
            )}
        </HeaderContainer>
    );
};

const LoggedInHeader = ({ userName }: { userName: string | undefined }) => {
    const setIsLoggedIn = useSetRecoilState(loginState);

    const handleLogout = () => {
        window.localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };
    return (
        <div className="loggedinAccount">
            <div>{userName} 반갑습니다.</div>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

const LoggedOutHeader = () => {
    const navigate = useNavigate();
    return (
        <div className="account">
            <div className="login" onClick={() => navigate("/login")}>
                로그인
            </div>
            <div className="signup" onClick={() => navigate("/signup")}>
                회원가입
            </div>
        </div>
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

    & > .loggedinAccount {
        height: 100%;
        display: flex;
        align-items: center;

        & > button {
            background-color: transparent;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;

            &:hover {
                color: red;
            }
        }
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
