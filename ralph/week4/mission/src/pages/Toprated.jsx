import Movies from "../components/movies";
import useCustomfetch from "../hooks/useCustomfetch";

import styled from "styled-components";


const Toprated  = () => {
    const {data:movies,isLoading,isError} =useCustomfetch(`/movie/top_rated?language=ko&page=1&region=KR`)
    if(isLoading){
        return <div style={{color:"white"}}>로딩중입니다..</div>
    }
    if (isError){
        return <div style={{color:"white"}}>에러를</div>
    }
    return (
        <TopratedDiv>
            {movies.data?.results.map((movie) => (
                <Movies key={movie.id} movie={movie}/>
            ))}
        </TopratedDiv>
    )
};

export default Toprated ;










//css
const TopratedDiv =styled.div `
background-color:pink;
margin-left:100px;
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

