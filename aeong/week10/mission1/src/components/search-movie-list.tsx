// search-movie-list.tsx
import Movie from "./movie";
import useCustomFetch from "../hooks/useCustomFetch";
import styled from "styled-components";

// movie 객체의 타입 지정
interface MovieType {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const SearchMovieList = () => {
  const url = `/search/movie?query=x&include_adult=false&language=ko-KR&page=1`;

  // useCustomFetch 반환 타입 지정
  const { data: movies }: { data: MovieType[] | null } = useCustomFetch(url);

  return (
    <MovieGridContainer>
      {movies?.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </MovieGridContainer>
  );
};

export default SearchMovieList;

const MovieGridContainer = styled.div``;
