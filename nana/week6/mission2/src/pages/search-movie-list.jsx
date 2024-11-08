import React from "react";
import ImgCard from "../components/ImgCard";
import useCustomFetch from "../hooks/useCustomFetch";
import { useSearchParams } from "react-router-dom";
import CardListSkeleton from "../components/card-list-skeleton";

const SearchMovieList = ({ searchValue }) => {
    const [searchParams] = useSearchParams();
    const mq = searchParams.get('mq');
    const url = `/search/movie?query=${mq || searchValue}&include_adult=false&language=ko-KR&page=1`;
    const { data: movies, isLoading, isError } = useCustomFetch(url);

    if(isError){
        return <h1 style={{color: 'white'}}>에러 발생</h1>
    }

    if (isLoading) {
        return <CardListSkeleton number={20} />
    }

    // console.log("mq is ", mq)
    if ( mq && movies.length === 0) {
        return (
            <div style={{textAlign: 'center'}}>
                <h1 style={{color: 'white'}}>해당하는 검색어 {mq}에</h1>
                <h1 style={{color: 'white'}}>해당하는 데이터가 없습니다.</h1>
            </div>
        );
    }

    return (
        <>
            {movies?.map((movie) => {
                return <ImgCard key={movie.id} movie={movie} />;
            })}
        </>
    );
};

export default SearchMovieList;
