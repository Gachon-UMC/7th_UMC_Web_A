import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
    return (
        <NavContainer>
            <div className="nav-link">
                <StyledLink to={"/search"}>검색</StyledLink>
            </div>
        </NavContainer>
    );
};

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    cursor: pointer;

    &:hover {
        color: blue;
        transition: color 0.5s;
    }
`;

const NavContainer = styled.nav`
    width: 10%;
    height: 100%;
    background-color: gray;
    position: fixed;
    margin-top: 80px;

    & > .nav-link {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        height: 40px;
        width: 100%;

        color: white;
    }
`;

export default NavBar;
