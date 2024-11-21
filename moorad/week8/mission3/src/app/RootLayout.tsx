import { Outlet } from "react-router-dom";
import Header from "../widgets/Header";
import styled from "styled-components";

const RootLayout = () => {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </>
    );
};

const Main = styled.main`
    width: 100%;
    padding: 0rem 2rem;
`;

export default RootLayout;
