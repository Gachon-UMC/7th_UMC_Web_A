import styled from 'styled-components';
import MovieDetails from './MovieDetails'; // MovieDetails 컴포넌트 임포트

interface PosterProps {
  backdropPath: string; // 영화 배경 이미지 경로
  title: string; // 영화 제목
  voteAverage: number; // 평균 평점
  releaseDate: string; // 개봉 날짜
  runtime: number; // 상영 시간
  tagline: string; // 영화 태그라인(확인필요)
  overview: string; // 영화 개요
}

const Poster = ({ 
  backdropPath, 
  title, 
  voteAverage, 
  releaseDate, 
  runtime, 
  tagline, 
  overview 
}: PosterProps) => (
  <PosterContainer>
    <img 
      src={`https://image.tmdb.org/t/p/w1280${backdropPath}`} 
      alt={title} 
    />
    <TextOverlaydiv>
      <TextOverlay>
        <MovieDetails 
          title={title} 
          voteAverage={voteAverage} 
          releaseDate={releaseDate} 
          runtime={runtime} 
          tagline={tagline} 
          overview={overview} 
        />
      </TextOverlay>
    </TextOverlaydiv>
  </PosterContainer>
);

export default Poster;

// CSS
const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;

  img {
    width: 100%;
    height: 20rem;
    border-radius: 10px;
  }
`;

const TextOverlaydiv = styled.div`
  width: 100%;
  height: 20rem;
  position: absolute;
  top: 0;
  background: linear-gradient(
    to right, 
    rgba(20, 20, 20, 1) 0%, 
    rgba(20, 20, 20, 1) 25%, 
    rgba(20, 20, 20, 0.7) 50%, 
    rgba(20, 20, 20, 0.4) 75%, 
    rgba(20, 20, 20, 0) 100%
  );
  overflow: hidden;
`;

const TextOverlay = styled.div`
  width: 50%;
  height: 100%;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 0;
  padding-left: 1em;
  padding-top: 1em;
`;
