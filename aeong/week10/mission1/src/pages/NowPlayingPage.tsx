// NowPlayingPage.tsx
import styled from "styled-components";
import Movie from "../components/movie";
import useGetMovies from "../hooks/queries/useGetMovies";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CardSkeleton from "../components/card-skeleton";

const NowPlayingPage = () => {
  // 페이지 상태 선언
  // useState 타입 지정
  const [page, setPage] = useState<number>(1);

  const {
    data: movies,
    isPending,
    isError,
    isFetching,
  } = useQuery({
    queryFn: () => useGetMovies({ category: "now_playing", pageParam: page }),
    queryKey: ["movies", "now_playing", page],
    staleTime: 10000,
  });

  if (isPending) {
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
        {movies?.results?.map((movie: any) => (
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
            if (movies?.total_pages > page) {
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
    background-color: #f82f62;
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