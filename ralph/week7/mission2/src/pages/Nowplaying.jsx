import { useNavigate } from "react-router-dom";
import Movies from "../components/movies";
import { useInfiniteQuery, useQuery } from "react-query";
import styled from "styled-components";
import { axiosInstance } from "../apis/axios-instance.js";
import useGetMovies from "../components/useGetMovies.jsx";
import Movielistskeleton from "../components/Movie/Movielistskeleton.jsx";
import useGetInfiniteMovies from "../components/useGetInfiniteMovies.jsx";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Spinner from "../components/Spinner.jsx";

// const QueryNowplaying = async () => {
//     const response = await axiosInstance.get(
//         `/movie/now_playing?language=ko&page=1&region=KR`
//     );
//     return response.data.results;
// };

const Nowplaying = () => {
    // const { data, isLoading, isError } = useQuery({
    //     queryKey: ["NowPlaying"],
    //     queryFn: () => UseGetMovies({ category: "now_playing", pageParam: 1 }),
    //     cacheTime: 10000,
    //     staleTime: 10000,
    // });
    const {
        data: movies,
        isLoading,
        isError,
        error,
        isFetching,
        hasNextPage,
        isPending,
        fetchNextPage,
        isFetchingNextPage,
    } = useGetInfiniteMovies("now_playing");

    const { ref, inView } = useInView({
        threshold: 0,
    });
    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);
    // 구조분해할당으로 안받으면
    // const queryresults = useQuery(["NowPlaying"], async () => {
    //     const response = await axiosInstance.get(
    //         `/movie/now_playing?language=ko&page=1&region=KR`
    //     );
    //     return response.data.results;
    // });
    // const data= queryresutls.data;
    //const isLoading = queryresults.isLoading;
    // 이런식으로 받아와야함

    if (isLoading) {
        // // return <div style={{ color: "white" }}>로딩중입니다..</div>;
        return <Movielistskeleton number={20} />;
        // return <h1>로딩중</h1>;
    }

    if (isError) {
        return <div style={{ color: "white" }}>에러를</div>;
    }
    console.log(movies?.pages);

    return (
        <NowplayingDiv>
            {movies?.pages.map((page) => {
                return page.map((movie, _) => {
                    return <Movies key={movie.id} movie={movie} />;
                });
            })}
            <div ref={ref} style={{ marginTop: "50px" }}>
                <Spinner />
            </div>
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
