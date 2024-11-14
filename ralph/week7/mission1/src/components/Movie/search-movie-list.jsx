import React from "react";
import Movies from "../movies";
import { useSearchParams } from "react-router-dom";
import useCustomfetch from "../../hooks/useCustomfetch";
import styled from "styled-components";
import Movielistskeleton from "./Movielistskeleton";
import * as S from "../skeleton/movieSkeletonstyle";
const SearchMovieList = ({ searchValue }) => {
    const [searchParams, setSearchParams] = useSearchParams({ mq: " " });
    const mq = searchParams.get("mq");

    const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
    const { data: movies, isLoading, isError } = useCustomfetch(url);
    console.log(movies);
    if (isLoading) {
        return (
            <div>
                <S.Edward>
                    <Movielistskeleton number={20} />
                </S.Edward>
            </div>
        );
    }
    if (isError) {
        return <h1>에러처리</h1>;
    }
    if (searchValue && movies?.length === 0) {
        return (
            <div>
                <h1 style={{ color: "white" }}>
                    해당하는 검색 {searchValue}에
                </h1>

                <h1 style={{ color: "white" }}>해당하는 데이터가 없습니다.</h1>
            </div>
        );
    }
    return (
        <MovieWrapper>
            {movies?.map((movie) => (
                <Movies key={movie.id} movie={movie} />
            ))}
        </MovieWrapper>
    );
};

export default SearchMovieList;

// css
const MovieWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
    gap: 1.25em;
    padding: 1.25em;
    justify-content: center;
    align-items: start;
`;
