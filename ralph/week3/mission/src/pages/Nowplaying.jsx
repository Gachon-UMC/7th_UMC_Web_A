import Movies from "../components/movies";
// 
import {useEffect, useState} from "react";
import axios from "axios";

const Nowplaying  = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            const movies = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGIyMmUwZjc0YTcyZGRlMTMyYTQ1NWFiZjJlYzRkZiIsIm5iZiI6MTcyODU0NzQyNC4yMDY3MDYsInN1YiI6IjY2ZmZlOGZjNmZjNzRlNTc1NmY4MGFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NeTrR8-D9iPMqPjFODW65DE7Ykve__qerLAGExyRCIs`
                }
            })
            setMovies(movies);
        }
        getMovies()
    }, []);

    return (
        <>
        // Optional Chaining 활용
            {movies.data?.results.map((movie) => (
                <Movies key={movie.id} movie={movie}/>
            ))}
        </>
    )
};

export default Nowplaying ;


