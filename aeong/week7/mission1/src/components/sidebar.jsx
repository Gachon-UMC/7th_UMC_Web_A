import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiMovie } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SearchContainer>
        <StyledIoSearch />
        <Search to="/search">찾기</Search>
      </SearchContainer>

      <MovieContainer>
        <StyledBiMovie />
        <Movie to="/movies">영화</Movie>
      </MovieContainer>
    </SidebarContainer>
  );
};

export default Sidebar;

// CSS
const SidebarContainer = styled.div`
  border-right: 1px solid #1b1c1d;
  padding-right: 50px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Search = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  width: 100px;
`;

const StyledIoSearch = styled(IoSearch)`
  color: white;
  font-size: 24px;
  margin: 10px;
`;

const MovieContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Movie = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  width: 100px;
`;

const StyledBiMovie = styled(BiMovie)`
  color: white;
  font-size: 24px;
  margin: 10px;
`;
