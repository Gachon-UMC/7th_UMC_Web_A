import styled from "styled-components";
import Movie from "../components/movie";
import useCustomFetch from "../hooks/useCustomFetch";

const TopRatedPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch("/movie/top_rated?language=ko-KR&page=1");

  if (isLoading) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩 중입니다...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러</h1>
      </div>
    );
  }

  return (
    <TopRatedContainer>
      {movies?.results?.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </TopRatedContainer>
  );
};

export default TopRatedPage;

// CSS
const TopRatedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
