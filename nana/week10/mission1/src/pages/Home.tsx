import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../apis/axios-instance';
import ImgCard from '../components/ImgCard';
import styled from 'styled-components';
import CardListSkeleton from "../components/card-list-skeleton";
import Pagination from '../components/Pagination';  // Pagination 컴포넌트 임포트

// FetchMovies 함수에 대한 타입 정의
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface FetchMoviesResponse {
  movies: Movie[];
  totalPages: number;
}

// FetchMovies 함수 정의
const FetchMovies = async (page: number): Promise<FetchMoviesResponse> => {
  const response = await axiosInstance.get(`/movie/now_playing?language=ko-KR&page=${page}`);
  return {
    movies: response.data.results,
    totalPages: response.data.total_pages,
  };
};

const HomePage = () => {
  const [page, setPage] = useState<number>(1);

  // useQuery의 타입 정의
  const { data, isLoading, isError } = useQuery<FetchMoviesResponse, Error>({
    queryFn: () => FetchMovies(page),
    queryKey: ['now_playing', page],
  });

  const movies = data?.movies || [];
  const totalPages = data?.totalPages || 1;

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

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

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
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
  margin-top: 1rem;
  margin-left: 1rem;
  gap: 1rem;
`;
