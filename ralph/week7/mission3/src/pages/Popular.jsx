import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import UseGetMovies from "../components/useGetMovies";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import useGetInfiniteMovies from "../components/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner.jsx";
import useGetMovies from "../components/useGetMovies";
import useMoveButton from "../hooks/useMoveButton.js";
const Popular = () => {
    const [hasMore, setHasMore] = useState(true);
    const initialData = 20;
    // custom hook 으로 만들어서 외부에서 가져옴
    const { reverseButton, nextButton, page } = useMoveButton();

    const {
        data: movies,
        isError,
        isPreviousData,
    } = useQuery({
        queryKey: ["popular", page],
        queryFn: () => useGetMovies({ category: "popular", pageParam: page }),
        keepPreviousData: true,
    });

    console.log(movies);

    useEffect(() => {
        if (movies?.length < initialData) return setHasMore(false);
        else return setHasMore(true);
    }, [movies]);
    return (
        <PopularDiv>
            {movies?.map((movie) => (
                <Movies key={movie.id} movie={movie} />
            ))}

            <div style={{ display: "flex", marginTop: "20px" }}>
                <button onClick={reverseButton} disabled={page === 1}>
                    이전
                </button>
                <div>{page}페이지</div>
                <button onClick={nextButton} disabled={!movies || !hasMore}>
                    다음
                </button>
            </div>
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
