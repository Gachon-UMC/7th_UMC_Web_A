import styled from "styled-components";
import { replace, useNavigate } from "react-router-dom";

const Movie = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <MovieContainer
      // 영화 컴포넌트를 클릭했을 때 상세 페이지로 이동하도록
      onClick={() =>
        navigate(`/movies/${movie.id}`, {
          replace: false,
          state: { movie },
        })
      }
    >
      <Poster src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
      <Title>{movie.title}</Title>
      <Date>{movie.release_date}</Date>
    </MovieContainer>
  );
};

export default Movie;

const MovieContainer = styled.div`
  margin: 10px;
  text-align: center;
  width: 200px;
`;

const Poster = styled.img`
  width: 160px;
  height: 240px;
  margin: 10px;
  border-radius: 10%;
`;

const Title = styled.h3`
  color: white;
`;

const Date = styled.p`
  color: white;
`;
