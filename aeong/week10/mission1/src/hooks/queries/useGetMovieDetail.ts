// useGetMovieDetail.ts
import { axiosInstance } from "../../apis/axios-instance";

// movieId 타입 지정
const useGetMovieDetail = async (movieId: number) => {
  const { data } = await axiosInstance.get(
    `/movie/${movieId}/credits?language=ko-KR&page=1`
  );
  return data;
};

export default useGetMovieDetail;
