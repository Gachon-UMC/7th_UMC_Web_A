import React from "react";
import { axiosInstance } from "../apis/axios-instance";
import { useInfiniteQuery } from "react-query";
import UseGetMovies from "./useGetMovies";

const useGetInfiniteMovies = (category) => {
    return useInfiniteQuery({
        queryKey: [category],
        queryFn: ({ pageParam = 1 }) => {
            console.log(category, pageParam);
            return UseGetMovies({ category, pageParam });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            console.log(lastPage);

            const lastMovie = lastPage[lastPage.length - 1];
            // console.log(lastPage);
            // console.log(allPages.length);

            // const lastMovie = lastPage.at(-1);

            // console.log(lastMovie);
            return lastMovie ? allPages?.length + 1 : 1;
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
