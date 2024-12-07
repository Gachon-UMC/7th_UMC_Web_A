// useGetMovies.ts
import { axiosInstance } from "../../apis/axios-instance";

interface GetMoviesParams {
  category: string;
  pageParam: number;
}

// category와 pageParam의 타입 지정
const useGetMovies = async ({ category, pageParam }: GetMoviesParams) => {
  const { data } = await axiosInstance.get(
    `/movie/${category}?language=ko-KR&page=${pageParam}`
  );
  return data;
};
export default useGetMovies;
