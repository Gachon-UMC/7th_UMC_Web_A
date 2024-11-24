import React from "react";
import { useQuery } from "react-query";
import useGetMoviesApi from "../apis/useGetMovieApi";
const useGetMovieData = ({ category, page }) => {
    console.log(category, page);

    const { data, isError, isLoading } = useQuery({
        queryKey: [category, page],
        queryFn: () => {
            return useGetMoviesApi({ category: category, pageParam: page });
        },
    });
    return { data, isError, isLoading };
};

export default useGetMovieData;
