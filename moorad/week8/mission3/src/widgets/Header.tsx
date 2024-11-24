import styled from "styled-components";
import SearchBar from "./SearchBar";
import usePageNavigate from "../shared/hooks/usePageNavigate";
import { useRecoilValue } from "recoil";
import { loginState } from "../shared/recoil/loginState";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

const Header = () => {
    // 로그인 된 정보를 담을 수 있는
    // token 값을 이용해서 로그인 만료 기간을 정할 수 있는
    // 만료시 refreshToken 이용하여 재로그인 가능하게
    const isLoggedIn = useRecoilValue(loginState);

    return (
        <HeaderContainer>
            <div className="logo" onClick={usePageNavigate("/")}>
                Moorad
            </div>
            <SearchBar></SearchBar>
            <AccountContainer>
                {isLoggedIn ? <LoggedIn></LoggedIn> : <LoggedOut></LoggedOut>}
            </AccountContainer>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.section`
    width: 100vw;
    height: 9vh;
    padding: 20px 1rem;
    position: sticky;
    background-color: black;
    top: 0px;
    display: grid;
    align-content: center;
    grid-template-columns: 1fr 2fr 1fr;
    z-index: 9999;

    & > .logo {
        width: 10vw;
        font-size: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: red;
        cursor: pointer;

        text-shadow: -0.5px -0.5px 0 white, /* 왼쪽 위 */ 0.5px -0.5px 0 white,
            /* 오른쪽 위 */ -0.5px 0.5px 0 white,
            /* 왼쪽 아래 */ 0.5px 0.5px 0 white;
    }
`;

const AccountContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1rem;

    & > button {
        cursor: pointer;
        width: 35%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        border: none;
    }

    & > .signin {
        &:hover {
            background-color: white;
            color: black;
        }
    }
    & > .signup {
        background-color: red;
        &:hover {
            background-color: white;
            color: red;
        }
    }
`;
export default Header;
