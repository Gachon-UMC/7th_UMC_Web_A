import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/getAxiosInstace";

interface MovieType {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

const useGetAPI = (type: string, dependencies: any[] = []) => {
    const [datas, setDatas] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    // type => popular,upcoming
    useEffect(() => {
        const getMovies = async () => {
            setIsLoading(true);
            try {
                const res = await axiosInstance.get(
                    `${type}?language=ko-KR&page=1`
                );
                const results = res.data.results;
                setDatas(() => [...results]);
            } catch (err) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        getMovies();
    }, [type, ...dependencies]);

    // 상태 반환
    return { datas, isLoading, isError };
};

export default useGetAPI;