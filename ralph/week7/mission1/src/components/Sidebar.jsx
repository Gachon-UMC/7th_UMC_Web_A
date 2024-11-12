import {Link} from "react-router-dom";
import { IoSearchCircleSharp } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";
import styled from "styled-components";

const  Sidebar = ()=> {
  return (
    <BackgroundDiv >
    <div>
      <div>
        <SearchLink to='/search'><IoSearchCircleSharp />검색</SearchLink>
      </div>
        <MovieLink to='/movie'><BiSolidCameraMovie />영화</MovieLink>
    </div>   
  </BackgroundDiv>    
  )
}
export default Sidebar;
                        //  여기도 App 컴포넌트에 있는 자식 요소에 있는 주소로 연결되어 있음
















                        
//css (styled-components)
const BackgroundDiv =styled.div`
margin-top:30px;
background-color:rgb(35,35,35);
display:inline-block;
`;

const SearchLink= styled(Link) `
font-size:25px;
margin:10px;
text-decoration:none;
color:white;
`;
 
// Link 태그 stylesheet 적용할 때는 (Link) 이런식으로 조금 다름
const MovieLink= styled(Link) `
font-size:25px;
margin:10px;
text-decoration:none;
color:white;
`;


