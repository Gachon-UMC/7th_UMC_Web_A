import Movies from "../components/movies";
import useCustomfetch from "../hooks/useCustomfetch";

import styled from "styled-components";


const Upcomming = () => {
   const {data:movies,isLoading,isError} =useCustomfetch(`/movie/upcoming?language=ko&page=1&region=KR`)
   if(isLoading){
    return <div style={{color:"white"}}>로딩중입니다..</div>
   } 
   if(isError){
    return <div style={{color:"white"}}>에러를</div>
   }
    return (
        <UpcommingDiv>
            {movies.data?.results.map((movie) => (
                <Movies key={movie.id} movie={movie}/>
            ))}
        </UpcommingDiv>
    )
};

export default Upcomming ;










//css
const UpcommingDiv =styled.div `
background-color:pink;
margin-left:100px;
display: flex;
flex-wrap: wrap;
justify-content: center;
`;
