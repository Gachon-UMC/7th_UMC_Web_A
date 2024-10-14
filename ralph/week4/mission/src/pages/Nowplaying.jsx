import Movies from "../components/movies";
import {useEffect, useState} from "react";
import axios from "axios";

import styled from "styled-components";
import { axiosInstance } from "../apis/axios-instance.js";
import useCustomfetch from "../hooks/useCustomfetch.js";

const Nowplaying  = () => {
    const {data:movies,isLoading,isError}=useCustomfetch(`/movie/now_playing?language=ko&page=1&region=KR`)
    if(isLoading){
        return <div style={{color:"white"}}>로딩중입니다..</div>
    }
    if(isError){
        return <div style={{color:"white"}}>에러를</div>
    }
    return (
        <NowplayingDiv>
            {movies.data?.results.map((movie) => (
                <Movies key={movie.id} movie={movie}/>
            ))} 
        </NowplayingDiv>
    )
};
     

export default Nowplaying ;


















//css
const NowplayingDiv =styled.div `
background-color:pink;
margin-left:100px;
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

