import React from 'react';
import { useParams } from 'react-router-dom'; // URL 파라미터를 가져오는 훅
import styled from 'styled-components'; // styled-components를 통한 스타일링
import useMovieDetail from '../hooks/useMovieDetail'; // 영화 상세 정보를 가져오는 커스텀 훅

const MovieDetailPage = () => {
  const { movieId } = useParams(); // URL에서 movieId 추출
  const { movieDetail, isLoading, isError } = useMovieDetail(movieId); // 영화 상세 정보 훅 사용

  console.log(movieDetail); // 여기에 추가

  // 로딩 중일 때
  if (isLoading) {
    return <div><h1 style={{ color: 'white' }}>로딩 중 입니다...</h1></div>;
  }

  // 에러 발생 시
  if (isError) {
    return <div><h1 style={{ color: 'white' }}>에러 발생</h1></div>;
  }

  // 영화 정보를 가져오지 못했을 때
  if (!movieDetail) {
    return <div><h1 style={{ color: 'white' }}>영화 정보를 불러올 수 없습니다.</h1></div>;
  }

  return (
      <PageContainer>
        {/* 영화 포스터와 배경 이미지 표시 */}
        <PosterContainer>
          <img 
            src={`https://image.tmdb.org/t/p/w1280${movieDetail.backdrop_path}`} 
            alt={movieDetail.title} // 이미지 설명
          />
          <TextOverlaydiv>
            <TextOverlay>
              {/* 영화 제목 및 상세 정보 */}
              <TextpTitle>{movieDetail.title}</TextpTitle>
              <Textp>평균 {movieDetail.vote_average}</Textp>
              <Textp>{movieDetail.release_date}</Textp>
              <Textp>{movieDetail.runtime}분</Textp>
              <TextpTagline>{movieDetail.tagline}</TextpTagline>
              <Textp>{movieDetail.overview}</Textp>
            </TextOverlay>
          </TextOverlaydiv>
        </PosterContainer>
        
        {/* 감독/출연 정보를 표시하는 섹션 */}
        <h2 style={{ marginTop: '3rem', fontSize: '1.8rem', width: '100%' }}>감독/출연</h2>
        <CastList>
          {movieDetail.credits?.cast.map((cast) => (
            <CastItem key={cast.id}>
              {/* 프로필 사진이 있는 경우 */}
              {cast.profile_path ? (
                <CastImage 
                  src={`https://image.tmdb.org/t/p/w1280${cast.profile_path}`} 
                  alt={cast.name} // 배우 이름 설명
                />
              ) : (
                <CastImagePlaceholder /> // 프로필 사진이 없는 경우
              )}
              <CastName>{cast.name}</CastName> {/* 배우 이름 */}
              <CastRole>{cast.character}</CastRole> {/* 역할 이름 */}
            </CastItem>
          ))}
        </CastList>
    </PageContainer>
  );
};

export default MovieDetailPage;

// 전체 페이지 스타일
const PageContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;  
  padding: 20px;
  color: white;
`
// 포스터 및 배경 이미지 스타일
const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 19rem;

  img {
    width: 100%;
    height: 20rem;
    border-radius: 10px;
  }
`
// 텍스트 오버레이 스타일
const TextOverlaydiv = styled.div`
  width: 100%;
  height: 20em;
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
`
// 오버레이 내 텍스트 스타일
const TextOverlay = styled.div`
  width: 50%;
  height: 100%;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 0;
  padding-left: 1em;
  padding-top: 1em;
`
// 제목 스타일
const TextpTitle = styled.p`
  margin: 0;
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
`
// 일반 텍스트 스타일
const Textp = styled.p`
  margin: 0;
  font-size: 0.9rem;
`
// 태그라인 스타일
const TextpTagline = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 1.1rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
`
// 출연진 목록 스타일
const CastList = styled.ul`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  min-height: 100%;
  justify-content: left;
`
// 개별 출연진 아이템 스타일
const CastItem = styled.li`
  margin: 20px;
  text-align: center;
  max-width: 100%;
`
// 배우 이름 스타일
const CastName = styled.p`
  margin: 5px 0;
  font-weight: bold;
`
// 배우 역할 스타일
const CastRole = styled.p`
  margin: 0;
`
// 배우 프로필 이미지 스타일
const CastImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #212121; // 배경색
`
// 프로필 이미지가 없을 때 사용할 플레이스홀더 스타일
const CastImagePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #212121; // 배경색
`