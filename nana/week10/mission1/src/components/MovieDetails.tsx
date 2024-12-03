import styled from 'styled-components';

// Props 타입 정의
interface MovieDetailsProps {
  title: string;
  voteAverage: number;
  releaseDate: string;
  runtime: number;
  tagline: string;
  overview: string;
}

const MovieDetails = ({
  title,
  voteAverage,
  releaseDate,
  runtime,
  tagline,
  overview
}: MovieDetailsProps) => (
  <div>
    <TextpTitle>{title}</TextpTitle>
    <Textp>평균 {voteAverage}</Textp>
    <Textp>{releaseDate}</Textp>
    <Textp>{runtime}분</Textp>
    <TextpTagline>{tagline}</TextpTagline>
    <Textp>{overview}</Textp>
  </div>
);

export default MovieDetails;

// CSS
const TextpTitle = styled.p`
  margin: 0;
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
`;

const Textp = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const TextpTagline = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 1.1rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
`;
