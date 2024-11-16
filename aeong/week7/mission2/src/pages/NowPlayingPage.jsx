import styled from "styled-components";
import Movie from "../components/movie";
import useGetMovies from "../hooks/queries/useGetMovies";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../components/card-skeleton";
import useGetInfiniteMovies from "../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const NowPlayingPage = () => {
  const {
    data: movies,
    isPending,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInfiniteMovies("now_playing");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

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
    <NowPlayingContainer>
      {movies?.pages
        ?.map((page) => page.results)
        ?.flat()
        ?.map((movie, _) => (
          <Movie movie={movie} key={movie.id} />
        ))}
      <div ref={ref}>{isFetching && <ClipLoader color={"#fff"} />}</div>
    </NowPlayingContainer>
  );
};

export default NowPlayingPage;

// CSS
const NowPlayingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
