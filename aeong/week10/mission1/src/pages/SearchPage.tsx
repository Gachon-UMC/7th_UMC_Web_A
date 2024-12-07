// SearchPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";
import CardSkeleton from "../components/card-skeleton";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  release_datea: any;
}

interface MoviesResponse {
  results: Movie[];
}

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // 디바운스: searchValue가 변경될 때마다 타이머로 debouncedValue 설정
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 800);

    // searchValue가 변경될 때마다 이전 타이머 정리
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // debouncedValue가 변경되면 URL로 navigate
  useEffect(() => {
    if (debouncedValue) {
      navigate(`/search?mq=${debouncedValue}`);
    }
  }, [debouncedValue, navigate]);

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // 영화 정보를 불러오는 URL 생성
  const url = debouncedValue
    ? `/search/movie?query=${debouncedValue}&include_adult=false&language=ko-KR&page=1`
    : null;

  // useCustomFetch
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch<MoviesResponse>(url);

  return (
    <SearchContainer>
      <SearchForm onSubmit={(e) => e.preventDefault()}>
        <SearchInput
          placeholder="영화 제목을 입력하세요..."
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <SearchButton onClick={() => setDebouncedValue(searchValue)}>
          검색
        </SearchButton>
      </SearchForm>

      <MovieResults>
        {isLoading && <CardSkeleton />}
        {isError && <p>오류가 발생했습니다. 다시 시도해주세요.</p>}
        {movies?.results && movies.results.length > 0
          ? movies.results.map((movie) => (
              <MovieItem key={movie.id}>
                <MoviePoster
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieReleaseDate>
                  개봉일: {movie.release_datea}
                </MovieReleaseDate>
              </MovieItem>
            ))
          : debouncedValue &&
            !isLoading && <p>해당 검색어로 결과가 없습니다.</p>}
      </MovieResults>
    </SearchContainer>
  );
};

export default SearchPage;

// CSS 스타일링
const SearchContainer = styled.div`
  width: 80vw;
  height: 80vh;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 1rem;
  width: 100%;
  border-radius: 4px 0 0 4px;
  border: none;
  font-size: 1rem;
  color: #333;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f82f62;
  width: 25%;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;

  &:hover {
    background-color: #ff547e;
  }
`;

const MovieResults = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

const MovieItem = styled.div`
  margin: 10px;
  text-align: center;
  width: 200px;
  transition: all 0.2s ease;
  &:hover {
    filter: brightness(50%);
  }
`;

const MoviePoster = styled.img`
  width: 160px;
  height: 240px;
  margin: 10px;
  border-radius: 10%;
`;

const MovieTitle = styled.h3`
  font-size: 1em;
  margin-top: 0.5em;
  color: white;
`;

const MovieReleaseDate = styled.p`
  font-size: 0.8em;
  color: #666;
`;
