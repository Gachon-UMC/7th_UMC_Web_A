import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { IoMdSearch } from "react-icons/io"; // 찾기 아이콘 import
import { BiCameraMovie } from "react-icons/bi"; // 영화 아이콘 import

const Sidebar = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    return (
        <>
            <StyledSidebar>
                <StyledSearch
                    onClick={() => navigate('/search')} 
                    style={{ fontWeight: 'bold', cursor: 'pointer' }} // 클릭 가능성 스타일 추가
                >
                    <IoMdSearch 
                        size={20}
                        style={{ 
                            marginRight: '10px',
                            position: 'relative',
                            top: '5px'
                        }}
                    />
                    찾기
                </StyledSearch>

                <StyledMovie
                    onClick={() => navigate('/category')} 
                    style={{ fontWeight: 'bold', cursor: 'pointer' }} // 클릭 가능성 스타일 추가
                >
                    <BiCameraMovie 
                        size={20} 
                        style={{ 
                            marginRight: '10px',
                            position: 'relative',
                            top: '5px'
                        }}
                    />
                    영화
                </StyledMovie>
            </StyledSidebar>
        </>
    );
};

export default Sidebar;


// CSS

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