import React from 'react';
import useCustomFetch from '../../hooks/useCustomFetch';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../apis/axios-instance';

import ImgCard from '../../components/ImgCard';
import styled from 'styled-components';
import CardListSkeleton from "../../components/card-list-skeleton";

const FetchMovies = async() => {
  const response = await axiosInstance.get(`/movie/top_rated?language=ko-KR&page=1`);
  /* console.log("return is ", response.data.results); */
  return response.data.results;
}

// MoviesPage 컴포넌트
const MoviesPage = () => {

  const {data: movies, isLoading, isError} = useQuery({queryFn: FetchMovies, queryKey: ['movies']});

  if(isLoading){
    return (
      <StyledSkeleton>
        <CardListSkeleton number={20} />
      </StyledSkeleton>
    )
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


// CSS
const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap; /* 화면이 작아질 때 자동으로 줄바꿈 */
    justify-content: left;
`
const StyledSkeleton = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap; /* 화면이 작아질 때 자동으로 줄바꿈 */
    justify-content: left;
`