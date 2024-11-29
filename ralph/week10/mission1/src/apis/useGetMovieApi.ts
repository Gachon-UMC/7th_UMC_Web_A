import React from "react";
import { axiosInstance } from "./axios-instance";
// 수정
type UseGetMoviesApiParams = {
    category: string;
    pageParam: number;
};
type Movie = {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
};

// 원래 화살표 함수 : const useGetMoviesApi=async()=>{} 이런 형식
// UseGetMoviesApiParams 이걸 통해 props로 받는 { category , pageParam } 이 값들의 타입을 지정해준다.
// return 하는 반환값인 response.data.results 의 type을 지정 해주는 Promise<Movie[]>
// <Movie[]>는 type Movie로 정의된 객체가 배열 형태로 존재
// 즉, Movie 타입의 객체들이 여러 개 모여 하나의 배열을 이루는 구조를 의미
// 이건 너가 console에서 response.data.results의 구조를 보면 알 수 있음
// 데이터가 어떻게 오는지 구조를 먼저 파악하고 그다음에 반환값의 type인 <Movie[]> 를 이렇게 지정할 수 있는 것이다.
// 이 데이터를 먼저 알아보려면  const response = await axiosInstance.get(`/movie/${category}?language=ko&page=${pageParam}&region=KR`); 이런식으로 console에 찍어보면 된다.
const useGetMoviesApi = async ({
    category,
    pageParam,
}: UseGetMoviesApiParams): Promise<Movie[]> => {
    console.log(
        "API Request:",
        `/movie/${category}?language=ko&page=${pageParam}&region=KR`
    );
    console.log(category, pageParam);
    const response = await axiosInstance.get(
        `/movie/${category}?language=ko&page=${pageParam}&region=KR`
    );
    console.log("영화받아오는중");
    console.log(response.data.results);

    return response.data.results;
};

export default useGetMoviesApi;

//export default UseGetMovies; 와 export default {UseGetMovies}; 차이가 뭐임
