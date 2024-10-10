import styled from "styled-components";
const NotFound = ()=> {
  return (
    <NotfoundDiv >너는 찾을 수 없는 페이지 야호~</NotfoundDiv>
    
  );
}
export default NotFound;  


//css
const NotfoundDiv = styled.div`
position:absolute;
top:100px;
left:100px;
color:white;
`;