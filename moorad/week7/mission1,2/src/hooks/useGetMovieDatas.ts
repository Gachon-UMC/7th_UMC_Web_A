import { useInfiniteQuery } from "@tanstack/react-query";
import getMoviesData from "../apis/getMoviesData";

const useGetMovieDatas = (apiAddress: string) => {
    const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
        queryKey: ["movieDatas", apiAddress],
        queryFn: ({ pageParam }) => getMoviesData(apiAddress, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            return currentPage < lastPage.totalPage
                ? currentPage + 1
                : undefined;
        },
        select: (data) => {
            return data.pages.flatMap((el) => el.results);
        },
    });

    return { data, isLoading, error, fetchNextPage };
};

export default useGetMovieDatas;
