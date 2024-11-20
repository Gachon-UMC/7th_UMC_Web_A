import styled from "styled-components";
import SearchBar from "./SearchBar";
import usePageNavigate from "../shared/hooks/usePageNavigate";

const Header = () => {
    return (
        <HeaderContainer>
            <div className="logo" onClick={usePageNavigate("/")}>
                Moorad
            </div>
            <SearchBar></SearchBar>
            <AccountContainer>
                <div
                    className="signin"
                    onClick={usePageNavigate("signin", {
                        state: { value: "zz" },
                    })}
                >
                    로그인
                </div>
                <div className="signup" onClick={usePageNavigate("signup")}>
                    회원가입
                </div>
            </AccountContainer>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.section`
    width: 100vw;
    height: 7vh;
    padding: 20px 1rem;
    position: sticky;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;

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

    & > div {
        cursor: pointer;
        width: 35%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
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
