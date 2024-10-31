// hooks/useMovies.js
import { useState, useEffect } from 'react';
import { axiosInstance } from '../apis/axios-instance'; // axios 인스턴스를 가져옴

// TMDB API에서 영화 데이터를 가져오는 커스텀 훅
const useCustomFetch = (url) => {
  // 가져온 데이터를 저장할 상태
  const [data, setData] = useState([]);
  
  // 로딩 상태를 저장할 상태 (true일 때 데이터가 로딩 중임)
  const [isLoading, setIsLoading] = useState(false);
  
  // 에러 상태를 저장할 상태 (true일 때 데이터 가져오기 중 에러 발생)
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
        setIsLoading(true); // 데이터 로딩 시작, 로딩 상태를 true로 설정
        try {
          // 주어진 URL에서 데이터 요청
          const response = await axiosInstance.get(url);
          
          // 가져온 데이터를 상태에 저장 (results 배열)
          setData(response.data.results);
        } catch (error) {
          // 에러 발생 시 에러 상태를 true로 설정
          setIsError(true);
        } finally {
          // 데이터 로딩 완료, 로딩 상태를 false로 설정
          setIsLoading(false);
        }
    }
    
    // 데이터 가져오기 함수 호출
    fetchData();
  }, [url]); // URL이 변경될 때마다 useEffect 실행

  // 데이터, 로딩 상태, 에러 상태를 반환
  return { data, isLoading, isError };
};

export default useCustomFetch;
