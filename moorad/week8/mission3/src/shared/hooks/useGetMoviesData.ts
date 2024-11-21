import { useRecoilValue } from "recoil";
import { useInfiniteQuery } from "@tanstack/react-query";
import getMoviesData from "../api/getMoviesData";
import getSearchMoviesData from "../api/getSearchMoviesData";
import { searchValueState } from "../recoil/searchValueState";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useGetMoviesData = (category: string) => {
    const searchValue = useRecoilValue(searchValueState);
    const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
        queryKey: ["movies", category, searchValue],
        queryFn: async ({ pageParam }) => {
            await delay(700);
            if (searchValue === "") {
                return getMoviesData(category, pageParam);
            } else {
                return getSearchMoviesData(searchValue, pageParam);
            }
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            return currentPage < lastPage?.totalPage
                ? currentPage + 1
                : undefined;
        },
        select: (data) => {
            return data.pages.flatMap((el) => el?.results);
        },
    });

    return { data, isLoading, error, fetchNextPage };
};
export default useGetMoviesData;
