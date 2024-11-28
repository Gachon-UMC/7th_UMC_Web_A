import Movies from "../components/movies.js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useGetMovieData from "../hooks/useGetMovieData.js";
import useMoveButton from "../hooks/useMoveButton.js";
import { Movie } from "../types/movieTypes.js";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
const Popular = () => {
    const [hasMore, setHasMore] = useState<boolean>(true);
    const initialData = 20;
    // custom hook 으로 만들어서 외부에서 가져옴
    const { reverseButton, nextButton, page } = useMoveButton();

    const { data, isError, isLoading } = useGetMovieData({
        category: "popular",
        page: page,
    });

    useEffect(() => {
        if (data?.length && data.length < initialData) return setHasMore(false);
        else return setHasMore(true);
    }, [data]);
    if (isError) return <Movielistskeleton number={20} />;
    return (
        <PopularDiv>
            <Moviediv>
                {data?.map((movie: Movie) => (
                    <Movies key={movie.id} movie={movie} />
                ))}
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
        </PopularDiv>
    );
};

export default Popular;

//css

const PopularDiv = styled.div`
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
