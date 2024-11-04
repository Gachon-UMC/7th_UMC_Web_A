import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import styled from "styled-components";

const Navbar = ()=> {
  const navigate = useNavigate()
  return (
    <NavbarNav>    
      <LogoLink to={'/'} >JUNGCHA</LogoLink>  
      <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>    
      <SignupButton onClick={() => navigate('/signup')}>회원가입</SignupButton>
   </NavbarNav>
   //navigate 설명은 movie 컨포넌트 참고
  )
}
        //<nav>태그 : 다른 웹 페이지로 연결하거나, 현재 웹 페이지의 콘텐츠 내부로 연결되는 탐색(navigation)을 위한 링크(links)가 있는 영역
        //navigate 설명은 movie 컨포넌트 참고
export default Navbar;









//css
const NavbarNav = styled.nav`
background-color: rgb(35,35,35);
justify-content: space-between;
display: flex;
margin-left: 0px;
`;

const LogoLink = styled(Link)`
text-decoration:none; 
font-size:40px;
margin-top:8px;
color: red;
text-decoration:none;
flex-grow:1; // 전체 공간이 넉넉한 상태에서 빈 공간을 누가 얼마나 더 가져 갈지를 정함
&:hover {
  filter: brightness(300%); // styled-components에서 hover은 이렇게 적용하기
}
`;

const LoginButton =styled.button`
background-color: rgb(35,35,35);
width: 70px;
color: white;
border: 1px solid white;
border-radius: 8px ;
margin: 4px 5px;
font-size: 16px;
&:hover{
color: white;
font-style: bold;
filter: brightness(300%);
font-weight: bold;
}
`;

const SignupButton =styled.button`
width: 70px;
background-color: rgb(181,0,181);
color: white;
border: 1px solid rgb(181,0,181);
border-radius: 8px ;
margin: 4px 2px 4px 0px;
font-size: 16px;
font-style: bold;
&:hover {
filter: brightness(120%);
}
`;