import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
    const navigate = useNavigate();
    return (
        <SideBarContainer>
            <div onClick={() => navigate("/search")}>검색</div>
        </SideBarContainer>
    );
};

const SideBarContainer = styled.nav`
    width: 10%;
    height: calc(100vh - 5rem);
    border: 1px solid white;

    & > div {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid white;
        color: white;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`;
export default SideBar;
