// import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { useRef } from "react";
import useGetMovieDatas from "../hooks/useGetMovieDatas";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

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

const Movies = () => {
    const location = useLocation();
    const apiAddress = location.state.value;
    // upcoming,popular
    // const { datas: movies, isLoading, isError } = useGetAPI(apiAddress);

    // const {
    //     status,
    //     data: movies,
    //     error,
    // } = useQuery({
    //     queryKey: ["movieData"],
    //     queryFn: async () => {
    //         await new Promise((resolve) => setTimeout(resolve, 3000));
    //         const res = await movieInstance.get(
    //             `${apiAddress}?language=${lang}&page=1`
    //         );
    //         const results = res.data.results;
    //         // 여기서 totalPages 값 설정 해줘야 할 것 같은데
    //         return results;
    //     },
    //     staleTime: 0,
    // });

    // 어차피 카테고리 버튼 눌러서 들어올 때 location.state.value navigate에 넣어서 들어오니까
    // 굳이 카테고리 설정해줄 필요는 없을 것 같고
    // 바로 infinite hook만 갈기면 될 듯 -> x
    // apiAddress 값이 바뀌면 기존 값이 초기화 되게 해줘야 됨
    // useEffect ?
    const {
        data: movies,
        isLoading,
        error,
        fetchNextPage,
    } = useGetMovieDatas(apiAddress);

    const bottomRef = useRef<HTMLDivElement | null>(null);
    useIntersectionObserver(bottomRef, fetchNextPage);

    if (isLoading) {
        return <div>Loading중..</div>;
    }

    if (error) {
        return <div>Error남..</div>;
    }

    return (
        <MainContents>
            {movies?.map((movie: MovieType) => {
                return <Card key={movie.id} movie={movie}></Card>;
            })}
            <div ref={bottomRef} className="bottomRef"></div>
        </MainContents>
    );
};

const MainContents = styled.main`
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 30px;
    column-gap: 5px;
    @media (max-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
    }
    overflow: scroll;
    height: calc(100vh - 5rem);

    & > .bottomRef {
        width: 20px;
    }
`;

export default Movies;
