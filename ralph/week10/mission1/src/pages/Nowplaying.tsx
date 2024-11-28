import Movies from "../components/movies.js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useMoveButton from "../hooks/useMoveButton.js";
import useGetMovieData from "../hooks/useGetMovieData.js";
import { Movie } from "../types/movieTypes.js";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
const Nowplaying = () => {
    const [hasMore, setHasMore] = useState<boolean>(true); // `hasMore`를 state로 관리
    const initialData = 20;
    // custom hook 으로 만들어서 외부에서 가져옴
    const { reverseButton, nextButton, page } = useMoveButton();
    const { data, isError, isLoading } = useGetMovieData({
        category: "now_playing",
        page: page,
    });

    useEffect(() => {
        if (data?.length && data.length < initialData) return setHasMore(false);
        else return setHasMore(true);
    }, [data]);
    if (isError) return <Movielistskeleton number={20} />;
    return (
        <NowplayingDiv>
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
    height: 100%;
`;
const Moviediv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-between;
    margin-left: 20px;
    height: 90%;
`;

const Buttondiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 5px;
    width: 20vw;
    height: 3vh;
`;

const Pagediv = styled.div`
    align-content: center;
    margin: 5px;
`;
