import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import { axiosInstance } from "../apis/axios-instance";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import UseGetMovies from "../components/useGetMovies";
import useGetInfiniteMovies from "../components/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import useGetMovies from "../components/useGetMovies";
import useMoveButton from "../hooks/useMoveButton";
// const QueryToprated = async () => {
//     const getdata = await axiosInstance.get(
//         `/movie/top_rated?language=ko&page=1&region=KR`
//     );
//     return getdata.data.results;
// };

const Toprated = () => {
    const [hasMore, setHasMore] = useState(true);
    const initialData = 20;
    // custom hook 으로 만들어서 외부에서 가져옴
    const { reverseButton, nextButton, page } = useMoveButton();

    const {
        data: movies,
        isError,
        isPreviousData,
    } = useQuery({
        queryKey: ["category", page],
        queryFn: () => useGetMovies({ category: "top_rated", pageParam: page }),
        keepPreviousData: true,
    });

    useEffect(() => {
        if (movies?.length < initialData) return setHasMore(false);
        else setHasMore(true);
    }, [movies]);

    console.log(page);

    return (
        <TopratedDiv>
            {movies?.map((movie) => {
                return <Movies key={movie.id} movie={movie} />;
            })}
            <div style={{ display: "flex", marginTop: "20px" }}>
                <button onClick={reverseButton} disabled={page === 1}>
                    이전
                </button>
                <div>{page}페이지</div>
                <button onClick={nextButton} disabled={!movies || !hasMore}>
                    다음
                </button>
            </div>
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