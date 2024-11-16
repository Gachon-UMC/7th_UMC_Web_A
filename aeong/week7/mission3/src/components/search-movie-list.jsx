// search-movie-list.jsx

import Movie from "../components/movie";
import useCustomFetch from "../hooks/useCustomFetch";
import { useSearchParams } from "react-router-dom";

const SearchMovieList = () => {
  const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;

  const { data: movies, isLoading, isError } = useCustomFetch(url);

  return (
    <MovieGridContainer>
      {movies.data?.results.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </MovieGridContainer>
  );
};

export default SearchMovieList;

const MovieGridContainer = styled.div``;
