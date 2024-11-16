import styled from "styled-components";
import Movie from "../components/movie";

import useGetMovies from "../hooks/queries/useGetMovies";
import { useQuery } from "@tanstack/react-query";

import CardSkeleton from "../components/card-skeleton";

const PopularPage = () => {
  const {
    data: movies,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => useGetMovies({ category: "popular", pageParam: 1 }),
    queryKey: ["movies", "popular"],

    //10초 동안 fresh한 상태
    cacheTime: 10000,
    //10초 동안 stale한 상태
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
    <PopularContainer>
      {movies?.results?.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </PopularContainer>
  );
};

export default PopularPage;

// CSS
const PopularContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
