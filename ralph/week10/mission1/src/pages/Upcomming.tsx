import Movies from "../components/movies";
import styled from "styled-components";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import { useEffect, useState } from "react";
import useMoveButton from "../hooks/useMoveButton";
import useGetMovieData from "../hooks/useGetMovieData";
import { Movie } from "../types/movieTypes";
const Upcoming: React.FC = () => {
    const [hasMore, setHasMore] = useState<boolean>(true);
    const initialData = 20;
    // custom hook 으로 만들어서 외부에서 가져옴
    const { reverseButton, nextButton, page } = useMoveButton();

    const { data, isError, isLoading } = useGetMovieData({
        category: "upcoming",
        page: page,
    });

    useEffect(() => {
        if (data?.length && data.length < initialData) return setHasMore(false);
        else return setHasMore(true);
    }, [data]);

    if (isError) return <Movielistskeleton number={20} />;
    return (
        <UpcommingDiv>
            {/* movie 라는 임의의 변수를 너가 만들었는데 이 변수안에는 한 줄 ,즉 하나의 영화에 관한 하나의 객체가 들어 가게 되는건 원래 알고 있을 것이다. 그래서 그 객체의 type을 지정해 주는게 (movie:Movie) 이 부분인데 내가 types.ts 라는 컴포넌트에 Movie 라고 정의되어 있기 때문에 그걸 가져와서 type을 지정해줌 */}
            {/* 그리고 movie={movie} 이 부분은  */}
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
        </UpcommingDiv>
    );
};

export default Upcoming;

//css
const UpcommingDiv = styled.div`
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
