import styled from "styled-components";
import Movie from "../components/movie";
import useCustomFetch from "../hooks/useCustomFetch";

const NowPlayingPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch("/movie/now_playing?language=ko-KR&page=1");

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
    <NowPlayingContainer>
      {movies.data?.results.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
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
