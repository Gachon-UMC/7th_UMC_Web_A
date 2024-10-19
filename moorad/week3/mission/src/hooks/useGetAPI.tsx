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

// URL이나 dependencies 바뀌면 useEffect 발동
// 사실 dependencies에 넣어둔 standard(전역 변수)가 바뀌면 url이 바뀌는 거라 굳이 두 개 다 넣어줄 필요는 없는데
// 이후에 dependencies에 뭐 들어갈지 모르니까 (ex. page) 일단 dependencies 넣어둠

/**
 * Custom Hook을 이용한 렌더링
 * @param {string} URL  : urlObj에서 전역 상태 변수를 key 값으로 url value를 넘겨줌
 * @param {RecoilState} dependencies : useEffect 함수 의존성 배열에 넘겨줄 값 -> standard라는 전역 상태 변수 넣어줌 , 즉 Category Component에서 버튼 클릭으로 전역 상태 변수가 변경되면 새로운 API 호출
 * @return {Array}
 */
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

    // 상태 반환
    return movies;
};

export default useGetAPI;
