import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

const RootLayout = () => {
    return (
        <>
            <Header></Header>
            <Container>
                <SideBar></SideBar>
                <MainSection>
                    <Outlet></Outlet>
                </MainSection>
            </Container>
        </>
    );
};
const Container = styled.div`
    display: flex;
    height: 100vh;
`;
const MainSection = styled.section`
    width: 100%;
    height: 100%;
`;
export default RootLayout;
