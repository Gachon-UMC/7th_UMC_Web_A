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
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
