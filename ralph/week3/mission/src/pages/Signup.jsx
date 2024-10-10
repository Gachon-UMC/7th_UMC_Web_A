import styled from "styled-components";

const Signup = ()=>{
  return (
  <div style={{
    position:"static"  // 부모 노드 
  }}>  
    <SignupDiv >회원가입 페이지</SignupDiv>
  </div> 
  );
}
export default Signup



//css

const SignupDiv = styled.div`
width:91.5%;
height:86%;
background-color:black;
position:absolute;
top:100px;
left:100px;
color:white;
font-size:30px;
`;