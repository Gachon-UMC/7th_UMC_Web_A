import { useNavigate } from "react-router-dom";
import Movies from "../components/movies";
import { useInfiniteQuery, useQuery } from "react-query";
import styled from "styled-components";
import { axiosInstance } from "../apis/axios-instance.js";
import useGetMovies from "../components/useGetMovies.jsx";
import Movielistskeleton from "../components/Movie/Movielistskeleton.jsx";
import useGetInfiniteMovies from "../components/useGetInfiniteMovies.jsx";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner.jsx";

// const QueryNowplaying = async () => {
//     const response = await axiosInstance.get(
//         `/movie/now_playing?language=ko&page=1&region=KR`
//     );
//     return response.data.results;
// };

const Nowplaying = () => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // `hasMore`를 state로 관리
    const initialData = 20;
    const {
        data: movies,
        isLoading,
        isError,
        isPreviousData,
    } = useQuery({
        queryKey: ["NowPlaying", page],
        queryFn: () =>
            useGetMovies({ category: "now_playing", pageParam: page }),
        cacheTime: 10000,
        staleTime: 10000,
        keepPreviousData: true,
    });
    console.log(movies?.length);

    useEffect(() => {
        if (movies?.length < initialData) return setHasMore(false);
        else return setHasMore(true);
    }, [movies]);

    return (
        <NowplayingDiv>
            {movies?.map((movie) => (
                <Movies key={movie.id} movie={movie} />
            ))}
            <button
                onClick={() => setPage((page) => Math.max(page - 1, 1))}
                disabled={page === 1}
            >
                이전
            </button>
            <div>{page}페이지</div>
            <button
                onClick={() => setPage((page) => page + 1)}
                disabled={!movies || !hasMore}
            >
                다음
            </button>
        </NowplayingDiv>
    );
};

export default Nowplaying;

//css
const NowplayingDiv = styled.div`
    background-color: pink;
    margin-left: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
