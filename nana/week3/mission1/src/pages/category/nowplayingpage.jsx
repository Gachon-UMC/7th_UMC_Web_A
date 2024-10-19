import React, { useState, useEffect } from 'react';
import axios from "axios";

import ImgCard from '../../components/imgcard';
import styled from 'styled-components';

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap; /* 화면이 작아질 때 자동으로 줄바꿈 */
    justify-content: left;
`
// MoviesPage 컴포넌트
const MoviesPage = () => {

  // 데이터를 저장할 state(초기값은 빈 배열)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      // TMDB API로 현재 상영 중인 영화 목록 가져오기  
      const movies = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjFhMjMxMDljMDEwYWNlMDc4YmU5NzliZTUyOTk4ZiIsIm5iZiI6MTcyODEzODAzOC4wNjkwMjIsInN1YiI6IjY3MDE0MzgzZTQ4MDE0OTE0Njg1NjU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t8AfT7_tsATey3plga_R90ECeJrh8mBGaKNM8_ERvFU`,
            }
        })
        // API 응답에서 영화 데이터를 state에 저장
        setMovies(movies.data.results);
    }
    // getMovies 함수 호출
    getMovies()
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행됨

  return (
    <CardsContainer>
      {movies.map((movie) => (
        // 영화 데이터를 기반으로 ImgCard 컴포넌트 생성 (포스터, 제목, 개봉일 전달)
        <ImgCard
          key={movie.id} 
          movie = {movie}
        />
      ))}
    </CardsContainer>
  );
}

export default MoviesPage;