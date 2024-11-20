import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useGetMovieData from "../hooks/useGetMovieData";
import useMoveButton from "../hooks/useMoveButton";
import { useContext } from "react";
import MovieDataContext from "../context/MovieDataContext";

// const { data, isError, isLoading } = useGetMovieData({
//     category: "top_rated",
//     page: page,
// });

const Toprated = () => {
    // context-api 사용해서 전역변수로 부터 불러옴
    const { data, isError, isLoading, reverseButton, nextButton, page } =
        useContext(MovieDataContext);
    const [hasMore, setHasMore] = useState(true);
    const initialData = 20;

    useEffect(() => {
        if (data?.length < initialData) return setHasMore(false);
        else setHasMore(true);
    }, [data]);

    console.log(page);

    return (
        <TopratedDiv>
            <Moviediv>
                {data?.map((movie) => {
                    return <Movies key={movie.id} movie={movie} />;
                })}
            </Moviediv>

            <Buttondiv>
                <button onClick={reverseButton} disabled={page === 1}>
                    이전
                </button>
                <Pagediv>{page}페이지</Pagediv>
                <button onClick={nextButton} disabled={!data || !hasMore}>
                    다음
                </button>
            </Buttondiv>
        </TopratedDiv>
    );
};

export default Toprated;

//css
const TopratedDiv = styled.div`
    background-color: pink;
    margin-left: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
const Moviediv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-between;
    margin-left: 20px;
`;

const Buttondiv = styled.div`
    display: flex;
    flexdirection: row;
`;
const Pagediv = styled.div`
    align-content: center;
    margin: 5px;
`;
