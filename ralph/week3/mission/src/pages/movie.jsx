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

  <div style={{
      width:"91.5%",
      height:"86%",
      backgroundColor:"black" ,
      position:"absolute",
      top:"100px",
      left:"100px",
      color:"white",
      fontSize:"30px",
      paddingLeft:"5px",
      paddingTop:"5px"
    }}>
      카테고리
    <div style={{display:"flex", flexShrink:"3", flexDirection:"row", justifyContent:"space-evenly",paddingLeft:"50px",paddingTop:"30px"}}>

      <NowplayingButton onClick={gotonowplaying}>
     
        <div style={{fontSize:"20px",
          fontWeight:"bold", color:"white"
        }}>현재 상영중인</div>
      </NowplayingButton>

      <PopularButton onClick={gotoupopular} > 
        <div style={{fontSize:"20px",
          fontWeight:"bold" , color:"white"
        }}>인기있는</div>
      </PopularButton>

      <TopratedButton onClick={gotouptoprated} >
        <div style={{fontSize:"20px",
          fontWeight:"bold" , color:"white"
        }}>높은 평가를 받은</div>
      </TopratedButton>


      <UpcommingButton onClick={gotoupcomming}>
        <div style={{fontSize:"20px",
          fontWeight:"bold" , color:"white"
        }}>개봉 예정중인</div>
      </UpcommingButton>  
    </div>
  </div>

</div>   
  );
}
export default Movie;

//css
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