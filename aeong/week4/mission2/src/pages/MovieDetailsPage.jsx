import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";
import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const { data: movieDetails } = useCustomFetch(
    `/movie/${movieId}?language=ko-KR`
  );

  const {
    data: credits,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/${movieId}/credits?language=ko-KR&page=1`);

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
    <Details>
      <MovieDetailsContainer>
        <MovieDetailsText>
          <h1>{movieDetails.data?.title}</h1>
          <h3>평균 {movieDetails.data?.vote_average}</h3>
          <h3>{movieDetails.data?.release_date}</h3>
          <h3>{movieDetails.data?.runtime}분</h3>
          <p>{movieDetails.data?.overview}분</p>
        </MovieDetailsText>
        <MovieImage
          src={`https://image.tmdb.org/t/p/original/${movieDetails.data?.backdrop_path}`}
        />
      </MovieDetailsContainer>

      <h1>출연</h1>
      <CastList>
        {credits.data?.cast?.map((castMember) => (
          <Cast key={castMember.id}>
            <CastImage
              src={`https://image.tmdb.org/t/p/original/${castMember.profile_path}`}
            />
            <p>{castMember.name}</p>
            <p>{castMember.character}</p>
          </Cast>
        ))}
      </CastList>
    </Details>
  );
};

export default MovieDetailsPage;

// CSS
const Details = styled.div`
  color: white;
  margin-left: 10px;
`;

const MovieImage = styled.img`
  width: 60rem;
  height: 30rem;
  border-radius: 5%;
  margin: 10px;
`;

const MovieDetailsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const MovieDetailsText = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
`;

const CastList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

const Cast = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  color: white;
  margin: 10px;
`;

const CastImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px;
`;
