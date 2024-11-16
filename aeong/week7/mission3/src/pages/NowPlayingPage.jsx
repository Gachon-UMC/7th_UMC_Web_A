import styled from "styled-components";
import Movie from "../components/movie";

import useGetMovies from "../hooks/queries/useGetMovies";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import CardSkeleton from "../components/card-skeleton";

const NowPlayingPage = () => {
  // 페이지 상태 선언
  const [page, setPage] = useState(1);

  const {
    data: movies,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryFn: () => useGetMovies({ category: "now_playing", pageParam: page }),
    queryKey: ["movies", "now_playing", page],
    keepPreviousData: true,
    staleTime: 10000,
    cacheTime: 10000,
  });

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러</h1>
      </div>
    );
  }

  return (
    <>
      <NowPlayingContainer>
        {movies?.results?.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </NowPlayingContainer>
      <Pagination>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          // 페이지가 1일 경우 비활성화
          disabled={page === 1 || isFetching}
        >
          이전
        </button>
        <span>{page} 페이지</span>
        <button
          onClick={() => {
            if (!isPreviousData && movies?.total_pages > page) {
              setPage((old) => old + 1);
            }
          }}
          // 마지막 페이지일 경우 비활성화
          disabled={isFetching || page === movies?.total_pages}
        >
          다음
        </button>
      </Pagination>
    </>
  );
};

export default NowPlayingPage;

// CSS
const NowPlayingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 10px;
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #333;
    color: white;

    &:disabled {
      cursor: not-allowed;
      background-color: #555;
    }
  }

  span {
    font-size: 16px;
    color: white;
    margin: 0 10px;
  }
`;
