import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import { axiosInstance } from "../apis/axios-instance";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import UseGetMovies from "../components/useGetMovies";
import useGetInfiniteMovies from "../components/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
// const QueryToprated = async () => {
//     const getdata = await axiosInstance.get(
//         `/movie/top_rated?language=ko&page=1&region=KR`
//     );
//     return getdata.data.results;
// };

const Toprated = () => {
    const { data, isError, isLoading, hasNextPage, isFetching, fetchNextPage } =
        useGetInfiniteMovies("top_rated");

    const { ref, inView } = useInView({ threshold: 0 });
    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if (isLoading) {
        return <Movielistskeleton number={20} />;
    }
    if (isError) {
        return <div style={{ color: "white" }}>에러를</div>;
    }

    return (
        <TopratedDiv>
            {data?.pages.map((page) => {
                return page.map((movie) => {
                    return <Movies key={movie.id} movie={movie} />;
                });
            })}
            <div ref={ref} style={{ marginTop: "50px" }}>
                <Spinner />
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
