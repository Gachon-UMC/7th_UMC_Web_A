import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import styled from 'styled-components';
import { useState } from "react";

const RootLayout = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    return (
        <>
            <Navbar /> {/* 상단에 고정된 Navbar */}
            <LayoutContainer>
                <Sidebar /> {/* 왼쪽에 고정된 Sidebar */}
                <ContentContainer>
                    <Outlet /> {/* 남은 공간에 렌더링되는 페이지 내용 */}
                </ContentContainer>
            </LayoutContainer>
        </>
    );
};

export default RootLayout;


// CSS

// sidebar와 outlet을 묶는 div styled-component
const LayoutContainer = styled.div`
    display: flex;
    height: 100vh; /* 전체 높이를 뷰포트 높이에 맞추기 */
    overflow: hidden; /* 부모의 스크롤을 숨기고 자식의 스크롤만 사용하도록 설정 */
`
// outlet 공간 styled-component
const ContentContainer = styled.div`
    display: flex;
    flex: 1; /* 남은 공간을 차지하도록 설정 */
    flex-direction: column;
    overflow-y: auto; /* 콘텐츠가 길어지면 스크롤 가능하도록 설정 */

    &::-webkit-scrollbar {
        width: 10px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 6px;
    }
    &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.5); /* 스크롤 트랙 색상 (반투명) */
    }
`