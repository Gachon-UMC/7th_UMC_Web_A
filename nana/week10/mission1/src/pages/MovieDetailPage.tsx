import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useCustomFetch from '../hooks/useCustomFetch';
import CastList from './CardList';
import Poster from '../components/Poster';
import { axiosInstance } from '../apis/axios-instance';

interface MovieDetail {
  backdrop_path: string;
  title: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  tagline: string;
  overview: string;
}

interface Video {
  key: string;
}

interface Credits {
  cast: Array<{ id: number; name: string; character: string; profile_path: string | null }>;
}

const FetchMovieVideo = async (movieId: string) => {
  const response = await axiosInstance.get(`/movie/${movieId}/videos?language=ko-KR`);
  return response.data.results[0];
};

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movieDetail, isLoading, isError } = useCustomFetch<MovieDetail | null>(`/movie/${movieId}?language=ko-KR`);
  const { data: credits, isLoading: isCreditsLoading, isError: isCreditsError } = useCustomFetch<Credits>(`/movie/${movieId}/credits?language=ko-KR`);
  const [video, setVideo] = useState<Video | null>(null);
  const [isVideoFocused, setIsVideoFocused] = useState<boolean>(false); // 동영상 포커스 상태

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (movieId) {
          const videoData = await FetchMovieVideo(movieId);
          setVideo(videoData);
        }
      } catch (error) {
        console.error('Failed to fetch video', error);
      }
    };

    if (movieId) {
      fetchVideo();
    }
  }, [movieId]);

  const handleVideoFocus = () => setIsVideoFocused(true); // 동영상에 포커스
  const handleVideoBlur = () => setIsVideoFocused(false); // 동영상 포커스 해제

  if (isLoading || isCreditsLoading) {
    return <div><h1 style={{ color: 'white' }}>로딩 중 입니다...</h1></div>;
  }

  if (isError || isCreditsError) {
    return <div><h1 style={{ color: 'white' }}>에러 발생</h1></div>;
  }

  // movieDetail이 null이 아닐 경우에만 렌더링
  if (!movieDetail) {
    return <div><h1 style={{ color: 'white' }}>영화 정보가 없습니다.</h1></div>;
  }

  return (
    <PageContainer>
      <Poster 
        backdropPath={movieDetail.backdrop_path}
        title={movieDetail.title}
        voteAverage={movieDetail.vote_average}
        releaseDate={movieDetail.release_date}
        runtime={movieDetail.runtime}
        tagline={movieDetail.tagline}
        overview={movieDetail.overview}
      />
      
      {video && (
        <VideoContainer
          aria-hidden={!isVideoFocused} // 동영상 컨테이너 접근성 설정
          onFocus={handleVideoFocus}
          onBlur={handleVideoBlur}
        >
          <h2>영화 예고편</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${video.key}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            tabIndex={0} // 포커스 가능하도록 설정
          ></iframe>
        </VideoContainer>
      )}

      <h2 style={{ marginTop: '3rem', fontSize: '1.8rem', width: '100%' }}>감독/출연</h2>
      <CastList credits={credits} />
    </PageContainer>
  );
};

export default MovieDetailPage;

// CSS
const PageContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  padding: 20px;
  color: white;
`;

const VideoContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 100%;
  iframe {
    width: 100%;
    height: 400px;
  }
`;
