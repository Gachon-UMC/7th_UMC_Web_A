import styled from "styled-components";
import Movie from "../components/movie";
import { useEffect, useState } from "react";
import axios from "axios";

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTIxMzgwYmU5ODc3MjE1MWUxNGY3Y2IxZGNlNThjMiIsIm5iZiI6MTcyODY4MDIyNy40OTg0MTUsInN1YiI6IjY3MDgzNTc3Njc3MGU2Y2FmYWU2NjhhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fLmfJKYx-Hz1m7yfJDx3PHzzpSJbR2ZxdGl-aQOiaXk`,
          },
        }
      );
      setMovies(movies);
    };
    getMovies();
  }, []);

  return (
    <NowPlayingContainer>
      {movies.data?.results.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </NowPlayingContainer>
  );
};

export default NowPlayingPage;

const NowPlayingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
