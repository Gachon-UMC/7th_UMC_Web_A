import styled from "styled-components";

const Homepage =()=>{
  return (
  <div style={{
    position:"static",  // 부모 노드 
  }}>
    <HompageDiv >홈페이지</HompageDiv>
</div>    
  );
}
export default Homepage


//css
const HompageDiv= styled.div`
width:91.5%;
height:86%;
background-color:black;
position:absolute;
top:100px;
left:100px;
color:white;
font-size:30px;
padding-left:5px;
padding-top:5px;
`;