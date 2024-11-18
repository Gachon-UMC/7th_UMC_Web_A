import { axiosInstance } from "../../apis/axios-instance";

const useGetMovieDetail = async (movieId) => {
  const { data } = await axiosInstance.get(
    `/movie/${movieId}/credits?language=ko-KR&page=1`
  );
  return data;
};
export default useGetMovieDetail;
