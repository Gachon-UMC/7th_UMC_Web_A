import React from "react";
import { useInfiniteQuery } from "react-query";
import useGetMovieApi from "../apis/useGetMovieApi";

const useGetInfiniteMovies = (category: string) => {
    return useInfiniteQuery({
        queryKey: [category],
        queryFn: ({ pageParam = 1 }) => {
            console.log(category, pageParam);
            return useGetMovieApi({ category, pageParam });
        },

        getNextPageParam: (lastPage, allPages) => {
            console.log(lastPage);

            const lastMovie = lastPage[lastPage.length - 1];

            // const lastMovie = lastPage.at(-1);

            return lastMovie ? allPages?.length + 1 : 1;
        },
    });
};

export default useGetInfiniteMovies;
