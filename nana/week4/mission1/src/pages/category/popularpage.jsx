import React, { useState, useEffect } from 'react';
import useCustomFetch from '../../hooks/useCustomFetch';

import ImgCard from '../../components/imgcard';
import styled from 'styled-components';

// MoviesPage 컴포넌트
const MoviesPage = () => {

  const {data: movies, isLoading, isError} = useCustomFetch(`/movie/popular?language=ko-KR&page=1`);

  if(isLoading){
    return <div>
      <h1 style={{color: 'white'}}>로딩 중 입니다...</h1>
    </div>
  }

  if(isError){
    return <div><h1 style={{color: 'white'}}>에러 중</h1></div>
  }

  return (
    <CardsContainer>
      {movies.map((movie) => (
        // 영화 데이터를 기반으로 ImgCard 컴포넌트 생성 (포스터, 제목, 개봉일 전달)
        <ImgCard
          key={movie.id} 
          movie = {movie}
        />
      ))}
    </CardsContainer>
  );
}

export default MoviesPage;

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap; /* 화면이 작아질 때 자동으로 줄바꿈 */
    justify-content: left;
`