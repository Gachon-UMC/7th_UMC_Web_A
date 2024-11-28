import { useQuery } from "react-query";
import useGetMoviesApi from "../apis/useGetMovieApi";
import { Movie } from "../types/movieTypes";
const useGetMovieData = ({
    category,
    page,
}: {
    category: string;
    page: number;
}) => {
    console.log(category, page);
    // <Movie[]> 이걸 안해주면 그냥 useQuery 가 반환하는 값의 타입에 의존하지만 정의해주는게 더 좋긴함
    const { data, isError, isLoading } = useQuery<Movie[]>({
        queryKey: [category, page],
        queryFn: () => {
            return useGetMoviesApi({ category: category, pageParam: page });
        },
    });
    return { data, isError, isLoading };
};

export default useGetMovieData;
