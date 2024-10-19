import styled from "styled-components";
import Movie from "../components/movie";
import { useEffect, useState } from "react";
import axios from "axios";
import useCustomFetch from "../hooks/useCustomFetch";

const PopularPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch("/movie/popular?language=ko-KR&page=1");

  if (isLoading) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩 중입니다...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러</h1>
      </div>
    );
  }

  return (
    <PopularContainer>
      {movies.data?.results.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </PopularContainer>
  );
};

export default PopularPage;

const PopularContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
