// src/components/MovieDetailPage/MovieDetails.js
import React from 'react';
import styled from 'styled-components';

const MovieDetails = ({ title, voteAverage, releaseDate, runtime, tagline, overview }) => (
  <div>
    <TextpTitle>{title}</TextpTitle>
    <Textp>평균 {voteAverage}</Textp>
    <Textp>{releaseDate}</Textp>
    <Textp>{runtime}분</Textp>
    <TextpTagline>{tagline}</TextpTagline>
    <Textp>{overview}</Textp>
  </div>
);

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

export default MovieDetails;
