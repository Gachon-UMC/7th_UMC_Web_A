// sidebar.jsx
import {Link} from "react-router-dom";
import styled from 'styled-components';
import { IoMdSearch } from "react-icons/io"; // 찾기 아이콘 import
import { BiCameraMovie } from "react-icons/bi"; // 영화 아이콘 import

// sidebar div 태그
const StyledSidebar = styled.nav`
    width: 150px;
    height: 100vh;
    background-color: #232323;
`
// 찾기 div
const StyledSearch = styled.div`
    margin-top: 20px;
    margin-left: 15px;
    color: white;
    font-size: 15px;
`
// 영화 div
const StyledMovie = styled.div`
    margin-top: 30px;
    margin-left: 15px;
    color: white;
`

const Sidebar = () => {
    return (
        <>
            <StyledSidebar>
                {/* 찾기 클릭 시 /search 페이지로 이동 */}
                <Link to={'/search'} style={{ textDecoration: "none"}}>
                    <StyledSearch style={{ fontWeight: 'bold' }}>
                        {/* 찾기 아이콘 정의 */}
                        <IoMdSearch 
                            size={20}
                            style={{ 
                                marginRight: '10px',
                                position: 'relative',
                                top: '5px'
                            }}/>
                    찾기
                    </StyledSearch>
                </Link>

                {/* 영화 클릭 시 /category 페이지로 이동 */}
                <Link to={'/category'} style={{ textDecoration: "none"}}>
                    <StyledMovie style={{ fontWeight: 'bold' }}>
                        {/* 영화 아이콘 정의 */}
                        <BiCameraMovie 
                            size={20} 
                            style={{ 
                                marginRight: '10px',
                                position: 'relative',
                                top: '5px'
                            }}/>
                    영화
                    </StyledMovie>
                </Link>
            </StyledSidebar>
        </>
    );
};

export default Sidebar;
