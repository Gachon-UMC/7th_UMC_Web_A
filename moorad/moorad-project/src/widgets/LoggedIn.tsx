import { useSetRecoilState } from "recoil";
import useGetUserInfo from "../shared/hooks/useGetUserInfo";
import { loginState } from "../shared/recoil/loginState";

const LoggedIn = () => {
    const setIsLoggedIn = useSetRecoilState(loginState);
    const { data: userName } = useGetUserInfo();

    return (
        <>
            <div>{userName} 반갑습니다.</div>
            <button
                className="signup"
                onClick={() => {
                    localStorage.removeItem("accessToken");
                    setIsLoggedIn(false);
                    alert("로그아웃 되었습니다.");
                }}
            >
                로그아웃
            </button>
        </>
    );
};

export default LoggedIn;
