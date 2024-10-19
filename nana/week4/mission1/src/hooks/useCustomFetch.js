// hooks/useMovies.js
import { useState, useEffect } from 'react';
import { axiosInstance } from '../apis/axios-instance';

// TMDB API에서 영화 데이터를 가져오는 커스텀 훅
const useCustomFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axiosInstance.get(url);
          setData(response.data.results);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
    }
    fetchData();
  }, [url]);

  return {data, isLoading, isError};
};

export default useCustomFetch;
