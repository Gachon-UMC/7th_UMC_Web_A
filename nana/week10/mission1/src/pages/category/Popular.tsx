import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../apis/axios-instance';
import { useInView } from 'react-intersection-observer';
import ImgCard from '../../components/ImgCard';
import styled from 'styled-components';
import CardListSkeleton from '../../components/card-list-skeleton';
import Spinner from '../../components/Spinner';

// 영화 데이터 타입 정의
interface Movie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number; 
  video: boolean;
  adult: boolean;
}

interface FetchMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}


// 데이터 요청 함수
const FetchMovies = async ({ pageParam = 1 }: { pageParam: unknown }): Promise<FetchMoviesResponse> => {
  const response = await axiosInstance.get(`/movie/popular?language=ko-KR&page=${pageParam}`);
  return response.data;
};

const MoviesPage = () => {
  const {
    data,
    isError,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<FetchMoviesResponse, Error>({
    queryKey: ['popular'],
    queryFn: FetchMovies,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,  // 초기 페이지 번호 설정
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <StyledSkeleton>
        <CardListSkeleton number={20} />
      </StyledSkeleton>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: 'white' }}>에러 발생</h1>
      </div>
    );
  }

  return (
    <CardsContainer>
      {/* 영화 카드 렌더링 */}
      {data?.pages.map((page) =>
        page.results.map((movie: Movie) => <ImgCard key={movie.id} movie={movie} />)
      )}

      {/* 스켈레톤 UI와 스피너 */}
      {isFetchingNextPage && (
        <StyledSkeleton>
          <CardListSkeleton number={10} />
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        </StyledSkeleton>
      )}

      {/* Intersection Observer를 위한 요소 */}
      <div ref={ref} style={{ marginTop: '50px' }} />
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
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  padding: 16px;
`;

const SpinnerContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
