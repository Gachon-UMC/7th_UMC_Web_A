import flower1 from "../images/flower1.png"
import flower2 from "../images/flower2.png"
import flower3 from "../images/flower3.png"
import flower4 from "../images/flower4.png"
import { useNavigate } from "react-router-dom";
import React from 'react';
import styled from 'styled-components';

const Movie= ()=> {
  const navigate=useNavigate();
                                      // 각각의 함수를 정의해서 각 함수가 호출되면 저 경로로 이동하도록 만들었다 
                                      // 이 경로들은 app.jsx 에서 children이라는 속성안에 자식 경로를 만들어서 표기
  const gotonowplaying =() =>{
    navigate('/nowplaying');
  }                            
  const gotoupcomming =() =>{
    navigate('/upcomming');
  }
  const gotoupopular =() =>{
    navigate('/popular');
  }
  const gotouptoprated=() =>{
    navigate('/toprated');
  }

  return (
<div style={{
  position:"static"  // 부모 노드 
    }}>

  <MovieDiv>
      카테고리
    <MoviebackgroundDiv>

        <NowplayingButton onClick={gotonowplaying}>
            <CommonDiv >현재 상영중인</CommonDiv>
        </NowplayingButton>

        <PopularButton onClick={gotoupopular} > 
            <CommonDiv >인기있는</CommonDiv>
        </PopularButton>

        <TopratedButton onClick={gotouptoprated} >
            <CommonDiv >높은 평가를 받은</CommonDiv>
        </TopratedButton>

        <UpcommingButton onClick={gotoupcomming}>
            <CommonDiv >개봉 예정중인</CommonDiv>
        </UpcommingButton>  
    </MoviebackgroundDiv>
  </MovieDiv>

</div>   
  );
}
export default Movie;


//css
const MovieDiv = styled.div`
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

const MoviebackgroundDiv=styled.div`
display:flex; 
flex-shrink:3; 
flex-direction:row;
justify-content:space-evenly;
padding-left:50px;
padding-top:30px;
`;

const NowplayingButton = styled.button `
  width: 250px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: url(${flower1});
  background-size: cover;
  border-color: white;
`;

const PopularButton = styled.button `
  width: 250px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: url(${flower2});
  background-size: cover;
  border-color: white;
`;

const TopratedButton = styled.button `
  width: 250px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: url(${flower3});
  background-size: cover;
  border-color: white;
`;

const UpcommingButton = styled.button `
  width: 250px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: url(${flower4});
  background-size: cover;
  border-color: white;
`;

const CommonDiv =styled.div`
font-size:20px;
font-weight:bold; 
color:white;
`;