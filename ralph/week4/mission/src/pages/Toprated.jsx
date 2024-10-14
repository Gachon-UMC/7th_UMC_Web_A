import Movies from "../components/movies";
import {useEffect, useState} from "react";
import axios from "axios";

import styled from "styled-components";

const Toprated  = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            const movies = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1&region=KR`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGIyMmUwZjc0YTcyZGRlMTMyYTQ1NWFiZjJlYzRkZiIsIm5iZiI6MTcyODU0NzQyNC4yMDY3MDYsInN1YiI6IjY2ZmZlOGZjNmZjNzRlNTc1NmY4MGFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NeTrR8-D9iPMqPjFODW65DE7Ykve__qerLAGExyRCIs`
                }
            })
            setMovies(movies);
        }
        getMovies()
    }, []);

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

