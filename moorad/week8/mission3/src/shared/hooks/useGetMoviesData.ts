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
            // 의도적으로 delay를 적용하여 주었습니다.
            await delay(400);
            // searchValue가 입력되지 않는다면 기본 영화 데이터 api를 사용합니다.
            if (searchValue === "") {
                return getMoviesData(category, pageParam);
            } else {
                // searchValue가 입력된다면 영화 검색 데이터 api를 사용합니다.
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
