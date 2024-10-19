import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

// Q. Outlet이란 ?

const RootLayout = () => {
    return (
        <>
            <Header></Header>
            <NavBar></NavBar>
            <Outlet />
        </>
    );
};

export default RootLayout;
