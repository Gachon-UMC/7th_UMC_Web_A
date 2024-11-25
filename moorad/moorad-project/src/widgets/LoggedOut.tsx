import usePageNavigate from "../shared/hooks/usePageNavigate";

const LoggedOut = () => {
    return (
        <>
            <button className="signin" onClick={usePageNavigate("signin")}>
                로그인
            </button>
            <button className="signup" onClick={usePageNavigate("signup")}>
                회원가입
            </button>
        </>
    );
};
export default LoggedOut;
