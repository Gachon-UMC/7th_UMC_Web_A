import styled from "styled-components";

const Login =()=>{
  return (
  <div style={{
      position:"static"  // 부모 노드 
    }}>
    <LoginDiv>로그인 페이지</LoginDiv>
  </div>
  );
}
export default Login;














//css
const LoginDiv = styled.div`
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
`