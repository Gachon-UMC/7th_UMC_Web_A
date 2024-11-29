import Movies from "../components/movies.js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useMoveButton from "../hooks/useMoveButton.js";
import useGetMovieData from "../hooks/useGetMovieData.js";
import { Movie } from "../types/movieTypes.js";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
const Nowplaying = () => {
    // 수정
    const [hasMore, setHasMore] = useState<boolean>(true);
    const initialData = 20;

    //수정
    // 여기서 type 선언을 안해준 이유는 useMovieButton 컴포넌트와 useGetMovieData 컴포넌트 모두 반환값에 type 을 지정했기 때문에 그 type을 그대로 따라가게 되므로 지정해줄 필요 없음
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
                {/* 수정 */}
                {/* movie 라는 임의의 변수를 너가 만들었는데 이 변수안에는 한 줄 ,즉 하나의 영화에 관한 하나의 객체가 들어 가게 되는건 원래 알고 있을 것이다. 그래서 그 객체의 type을 지정해 주는게 (movie:Movie) 이 부분인데 내가 types.ts 라는 컴포넌트에 Movie 라고 정의되어 있기 때문에 그걸 가져와서 type을 지정해줌 */}
                {/* 그리고 movie={movie} 이 부분은  */}

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
