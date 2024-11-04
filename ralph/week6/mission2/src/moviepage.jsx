import {useEffect,useState} from "react";
import axios from "axios";
import {POPULARMOVIE} from "./mock/popularmovie";
import Card from "./components/card";
import * as S from './movies.style.js'

const MoviesPage = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getMovies = async () => {
        const movies = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=ko&page=1&region=KR`, {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGIyMmUwZjc0YTcyZGRlMTMyYTQ1NWFiZjJlYzRkZiIsIm5iZiI6MTcyODU0NzQyNC4yMDY3MDYsInN1YiI6IjY2ZmZlOGZjNmZjNzRlNTc1NmY4MGFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NeTrR8-D9iPMqPjFODW65DE7Ykve__qerLAGExyRCIs`,
            }
        })
        setMovies(movies);
    }
    getMovies()
}, []);
  return (

      <S.CardList>
          {POPULARMOVIE.results.map((movie) => (
              <Card key={movie.id} movie={movie}/>
          ))}
      </S.CardList>
  )
};

export default MoviesPage;