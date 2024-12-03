import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io'; // 찾기 아이콘 import
import { BiCameraMovie } from 'react-icons/bi'; // 영화 아이콘 import
import SidebarItem from './SidebarItem'; // SidebarItem 컴포넌트 불러오기
import styled from 'styled-components';

const Sidebar = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <StyledSidebar>
      <SidebarItem 
        icon={IoMdSearch} 
        text="찾기" 
        onClick={() => navigate('/search')} 
      />
      <SidebarItem 
        icon={BiCameraMovie} 
        text="영화" 
        onClick={() => navigate('/category')} 
      />
    </StyledSidebar>
  );
};

export default Sidebar;

// CSS
const StyledSidebar = styled.nav`
  width: 150px;
  height: 100vh;
  background-color: #232323;
`;
