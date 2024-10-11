import { useState, useEffect } from "react";
import axios from "axios";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
};

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

// 함수 바깥에 있는 변수들도 리렌더링이 되는지

const useGetAPI = (URL: string, dependencies: any[] = []) => {
    const [movies, setMovies] = useState<MovieType[]>([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const res = await axios.get(URL, options);
                if (res.status !== 200)
                    throw new Error("데이터를 불러오지 못했습니다.");
                const results = res.data.results;
                setMovies(() => [...results]);
            } catch (err) {
                console.log(err);
            }
        };
        getMovies();
    }, [URL, ...dependencies]);
    console.log(movies);

    return movies;
};

export default useGetAPI;
