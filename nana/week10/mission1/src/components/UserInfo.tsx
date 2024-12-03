import styled from "styled-components";

interface UserInfoProps {
    user: { email: string } | null; // user 객체 타입 정의
    onLogout: () => void;          // 로그아웃 콜백 함수 타입 정의
}

const UserInfo= ({ user, onLogout }: UserInfoProps) => {
    return (
        <>
            <GreetingText>{user?.email.split('@')[0]}님 반갑습니다!</GreetingText>
            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </>
    );
};

export default UserInfo;

// CSS
const GreetingText = styled.div`
    margin-right: 20px;
    color: white;
    font-size: 1rem;
`;

const LogoutButton = styled.button`
    padding: 10px 15px;
    background-color: #f82f62;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #ff547e;
    }
`;
