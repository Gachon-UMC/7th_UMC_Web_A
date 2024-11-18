import React from "react";
import { useInfiniteQuery } from "react-query";
import UseGetMovies from "./useGetMovies";

const useGetInfiniteMovies = (category) => {
    return useInfiniteQuery({
        queryKey: [category],
        queryFn: ({ pageParam = 1 }) => {
            console.log(category, pageParam);
            return UseGetMovies({ category, pageParam });
        },
        getNextPageParam: (lastPage, allPages) => {
            console.log(lastPage);

            // 마지막 페이지에 [19]번 인댁스를 가진 데이터가 존재한다면 allPages?.length값에 1을 더해서 pageParam 값을 1 증가시킨다
            const lastMovie = lastPage[lastPage.length - 1];
            // console.log(lastPage);
            // console.log(allPages.length);

            // const lastMovie = lastPage.at(-1);

            // console.log(lastMovie);
            return lastMovie ? allPages?.length + 1 : undefined;
        },
    });
};
// const UseGetInfiniteMovies = (category) => {
//     return useInfiniteQuery({
//         queryKey: ["movies", category],
//         queryFn: ({ pageParam = 1 }) => UseGetMovies({ category, pageParam }),
//         getNextPageParam: (lastPage, allPages) => lastPage.nextPage ?? false,
//         initialPageParam: 1,
//     });
// };

export default useGetInfiniteMovies;
