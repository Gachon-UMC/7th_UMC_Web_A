import React, { useEffect, useState, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../apis/axios-instance';
import { useInView } from 'react-intersection-observer';
import ImgCard from '../../components/ImgCard';
import styled from 'styled-components';
import CardListSkeleton from "../../components/card-list-skeleton";
import Spinner from "../../components/Spinner";

const FetchMovies = async ({ pageParam = 1 }) => {
  const response = await axiosInstance.get(`/movie/now_playing?language=ko-KR&page=${pageParam}`);
  // console.log("response return is ", response.data);
  return response.data;
}

const MoviesPage = () => {

  const {
    data,
    isError,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['now_playing'],
    queryFn: FetchMovies,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
  });

  const { ref, inView } = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // 콘솔 확인
  /* 
  useEffect(() => {
    console.log('isFetching is :', isFetching);
  }, [isFetching]);
   */

  if (isLoading) {
    return (
      <StyledSkeleton>
        <CardListSkeleton number={20} />
      </StyledSkeleton>
    );
  }

  if (isError) {
    return <div><h1 style={{ color: 'white' }}>에러 발생</h1></div>;
  }

  return (
    <CardsContainer>
      {/* 페이지 데이터를 화면에 표시 */}
      {data.pages.map((page) => {
        return page.results.map((movie) => {
          return <ImgCard key={movie.id} movie={movie} />
        });
      })}
      
      {/* 스켈레톤 UI와 스피너 표시 */}
      {(isFetchingNextPage || showFetchingSkeleton) && (
        <StyledSkeleton>
          <CardListSkeleton number={10} />
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        </StyledSkeleton>
      )}

      
      <div ref={ref} style={{ marginTop: "50px" }}>
      </div>
    </CardsContainer>
  );
};

export default MoviesPage;

// CSS
const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
`;

const StyledSkeleton = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: left;
`;
const SpinnerContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;