import React from "react";
import { axiosInstance } from "./axios-instance";

type UseGetMoviesApiParams = {
    category: string;
    pageParam: number;
};
type Movie = {
    id: number;
    title: string;
    release_date?: string;
    poster_path?: string;
};
const useGetMoviesApi = async ({
    category,
    pageParam,
}: UseGetMoviesApiParams): Promise<Movie[]> => {
    console.log(category, pageParam);
    const response = await axiosInstance.get(
        `/movie/${category}?language=ko&page=${pageParam}&region=KR`
    );
    console.log("영화받아오는중");
    // console.log(response);

    return response.data.results;
};

export default useGetMoviesApi;

//export default UseGetMovies; 와 export default {UseGetMovies}; 차이가 뭐임
