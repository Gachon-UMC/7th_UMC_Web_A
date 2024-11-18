import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Sidebar from "../components/sidebar.jsx";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Sidebar />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </Container>
    </>
  );
};

export default RootLayout;

// CSS
const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 54em;
`;

const OutletContainer = styled.div`
  overflow-y: auto; /* Content 영역 내부만 스크롤 가능 */
`;
