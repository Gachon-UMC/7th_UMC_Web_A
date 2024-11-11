import { useState, useEffect } from 'react';
import { axiosInstance } from '../apis/axios-instance'; // axios 인스턴스를 가져옴

const useMovieDetail = (movieId) => {
  // 영화 상세 정보를 저장할 상태
  const [movieDetail, setMovieDetail] = useState(null);
  
  // 로딩 상태를 저장할 상태 (true일 때 데이터가 로딩 중임)
  const [isLoading, setIsLoading] = useState(false);
  
  // 에러 상태를 저장할 상태 (true일 때 데이터 가져오기 중 에러 발생)
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // 영화 상세 정보를 가져오는 비동기 함수
    const fetchMovieDetail = async () => {
      setIsLoading(true); // 데이터 로딩 시작, 로딩 상태를 true로 설정
      try {
        // TMDB API에서 영화 상세 정보 요청
        const response = await axiosInstance.get(`/movie/${movieId}?language=ko-KR&append_to_response=credits`);
        
        // 가져온 영화 상세 정보를 상태에 저장
        setMovieDetail(response.data);
      } catch (error) {
        // 에러 발생 시 에러 상태를 true로 설정
        setIsError(true);
      } finally {
        // 데이터 로딩 완료, 로딩 상태를 false로 설정
        setIsLoading(false);
      }
    };

    // movieId가 유효한 경우에만 데이터 fetch
    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]); // movieId가 변경될 때마다 useEffect 실행

  // 영화 상세 정보, 로딩 상태, 에러 상태를 반환
  return { movieDetail, isLoading, isError };
};

export default useMovieDetail;
