import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../apis/axios-instance';
import ImgCard from '../components/ImgCard';
import styled from 'styled-components';
import CardListSkeleton from "../components/card-list-skeleton";

const FetchMovies = async(page) => {
  const response = await axiosInstance.get(`/movie/now_playing?language=ko-KR&page=${page}`);
  // console.log(response.data); // 데이터 구조 확인
  return {
    movies: response.data.results,
    totalPages: response.data.total_pages, // total_pages 반환
  };
};

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryFn: () => FetchMovies(page),
    queryKey: ['now_playing', page],
  });

  const movies = data?.movies || [];
  const totalPages = data?.totalPages || 1;

  const handleNextPage = () => { if (page < totalPages) setPage((prev) => prev + 1); };
  const handlePrevPage = () => { if (page > 1) setPage((prev) => prev - 1); };

  if (isLoading) {
    return (
      <StyledSkeleton>
        <CardListSkeleton number={20} />
      </StyledSkeleton>
    );
  }

  if (isError) {
    return <div><h1 style={{ color: 'white' }}>에러 중</h1></div>;
  }

  return (
    <StyledHomePage>
      <CardsContainer>
        {movies.map((movie) => (
          <ImgCard key={movie.id} movie={movie} />
        ))}
      </CardsContainer>

      <PaginationContainer>
        <PaginationButton onClick={handlePrevPage} disabled={page === 1}>이전</PaginationButton>
        <PageNumber>{page} 페이지</PageNumber>
        <PaginationButton onClick={handleNextPage} disabled={page === totalPages}>다음</PaginationButton>
      </PaginationContainer>
    </StyledHomePage>
  );
};

export default HomePage;

// CSS
const StyledHomePage = styled.div`
  color: white;
  margin-top: 1rem;
`;

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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10rem;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  margin: 0 8px;
  background-color: #F82F62;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
`;
