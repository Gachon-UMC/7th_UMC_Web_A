import flower1 from "../images/flower1.png"
import flower2 from "../images/flower2.png"
import flower3 from "../images/flower3.png"
import flower4 from "../images/flower4.png"
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Link } from 'react-router-dom';
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

      <button onClick={gotonowplaying} style={{
      width:"200px",
      height: "80px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      backgroundImage: `url(${flower1})`,
      backgroundSize: "cover",
      borderColor:"white"}} >
        <div style={{fontSize:"20px",
          fontWeight:"bold", color:"white"
        }}>현재 상영중인</div>
      </button>

      <button onClick={gotoupopular} style={{
      width:"200px",
      height: "80px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      backgroundImage: `url(${flower2})`,
      backgroundSize: "cover",
      borderColor:"white"}} > 
        <div style={{fontSize:"20px",
          fontWeight:"bold" , color:"white"
        }}>인기있는</div>
      </button>

      <button onClick={gotouptoprated} style={{
      width:"200px",
      height: "80px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      backgroundImage: `url(${flower3})`,
      backgroundSize: "cover",
      borderColor:"white"}} >
        <div style={{fontSize:"20px",
          fontWeight:"bold" , color:"white"
        }}>높은 평가를 받은</div>
      </button>

      <button onClick={gotoupcomming} style={{
      width:"200px",
      height: "80px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      backgroundImage: `url(${flower4})`,
      backgroundSize: "cover",
      borderColor:"white"}} >
        <div style={{fontSize:"20px",
          fontWeight:"bold" , color:"white"
        }}>개봉 예정중인</div>
      </button>  
    </div>
  </div>

</div>   
  );
}

export default Movie;
