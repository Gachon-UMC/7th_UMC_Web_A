import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import { axiosInstance } from "../apis/axios-instance";
import UseGetMovies from "../components/useGetMovies";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import useGetInfiniteMovies from "../components/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import useGetMovies from "../components/useGetMovies";
import useMoveButton from "../hooks/useMoveButton";
// const QueryUpcoming = async () => {
//     const response = await axiosInstance.get(
//         `/movie/upcoming?language=ko&page=1&region=KR`
//     );
//     return response.data.results;
// };

const Upcoming = () => {
    const [hasMore, setHasMore] = useState(true);
    const initialData = 20;
    // custom hook 으로 만들어서 외부에서 가져옴
    const { reverseButton, nextButton, page, setPage } = useMoveButton();

    const { data: movies, isError } = useQuery({
        queryKey: ["upcoming", page],
        queryFn: () => {
            return useGetMovies({ category: "upcoming", pageParam: page });
        },
    });

    useEffect(() => {
        if (movies?.length < initialData) return setHasMore(false);
        else return setHasMore(true);
    }, [movies]);

    // const reverseButton = () => {
    //     return setPage(Math.max(page - 1, 1));
    // };

    // const nextButton = () => {
    //     return setPage(page + 1);
    // };

    if (isError) return <Movielistskeleton number={20} />;
    return (
        <UpcommingDiv>
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
