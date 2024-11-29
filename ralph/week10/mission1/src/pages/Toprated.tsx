import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useGetMovieData from "../hooks/useGetMovieData";
import useMoveButton from "../hooks/useMoveButton";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import { Movie } from "../types/movieTypes";
const Toprated: React.FC = () => {
    // 이건 useMoveButton 컴포넌트에서 정의함
    // type UseMoveButtonReturn = {
    //     reverseButton: () => void;
    //     nextButton: () => void;
    //     page: number;
    // };

    // 이건 useGetMoviData 컴포넌트 의 props 부분에 정의 되어 있음
    // type UseGetMovieDataProps = {
    //     category: string;
    //     page: number;
    // };

    // 이건 useMoveButton 컴포넌트 의 return 값의 type을 정의하는 건데 이건 useMoveButton 컴포넌트에서 정의되어 있음
    // 그 코드를 참고하도록
    // type UseGetMovieDataReturn = {
    //     data?: Movie[]; // undefined일 수도 있음
    // };

    // useMoveButton 과 useGetMovieData 컴포넌트에서 구조분해할당으로 받아온 이 값들은 각각의 컴포넌트에서 미리 type을 다 지정한 상태로 값들을 받은 것이므로 여기서는 그냥 값을 원래대로 사용만 하면 됨
    const { reverseButton, nextButton, page } = useMoveButton();
    const { data, isError } = useGetMovieData({
        category: "now_playing",
        page: page,
    });
    console.log(data);

    const [hasMore, setHasMore] = useState<boolean>(true);
    const initialData = 20;

    useEffect(() => {
        if (data?.length && data.length < initialData) return setHasMore(false);
        else setHasMore(true);
    }, [data]);

    console.log(page);
    if (isError) return <Movielistskeleton number={20} />;
    return (
        <TopratedDiv>
            <Moviediv>
                {data?.map((movie: Movie) => {
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
