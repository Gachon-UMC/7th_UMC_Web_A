import flower1 from "../images/flower1.png"
import flower2 from "../images/flower2.png"
import flower3 from "../images/flower3.png"
import flower4 from "../images/flower4.png"
import { useNavigate } from "react-router-dom";
import React from 'react';
import styled from 'styled-components';

const Movie= ()=> {
  const navigate=useNavigate();
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
    <div style={{display:"flex", flexShrink:"3", flexDirection:"row", justifyContent:"space-evenly",paddingLeft:"50px",paddingTop:"30px"}}>

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
    </div>
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


const NowplayingButton = styled.button `
  width: 200px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: url(${flower1});
  background-size: cover;
  border-color: white;
`;

const PopularButton = styled.button `
  width: 200px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: url(${flower2});
  background-size: cover;
  border-color: white;
`;

const TopratedButton = styled.button `
  width: 200px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: url(${flower3});
  background-size: cover;
  border-color: white;
`;

const UpcommingButton = styled.button `
  width: 200px;
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