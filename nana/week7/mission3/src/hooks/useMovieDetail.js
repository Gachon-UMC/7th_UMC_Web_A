import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../apis/axios-instance'; // axios 인스턴스를 가져옴

const useMovieDetail = (movieId) => {

  const FetchMoviesDetail = async() => {
    const response = await axiosInstance.get(`/movie/${movieId}?language=ko-KR&append_to_response=credits`);
    /* console.log("return is ", response.data.results); */
    return response.data;
  }
  
  const {data: movieDetail, isLoading, isError} = useQuery({
    queryFn: FetchMoviesDetail, 
    queryKey: ['movieDetail']
  });


  // 영화 상세 정보, 로딩 상태, 에러 상태를 반환
  return { movieDetail, isLoading, isError };
};

export default useMovieDetail;
