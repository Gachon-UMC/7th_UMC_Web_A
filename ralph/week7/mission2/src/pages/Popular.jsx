import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import UseGetMovies from "../components/useGetMovies";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import useGetInfiniteMovies from "../components/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Spinner from "../components/Spinner.jsx";
const Popular = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        isFetching,
        hasNextPage,
        isPending,
        fetchNextPage,
        isFetchingNextPage,
    } = useGetInfiniteMovies("popular");

    const { ref, inView } = useInView({
        threshold: 0,
    });
    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    // if (isLoading) {
    //     return <Movielistskeleton number={20} />;
    // }
    // if (isError) {
    //     return <div style={{ color: "white" }}>에러를</div>;
    // }
    return (
        <PopularDiv>
            {data?.pages.map((page) => {
                return page.map((movie) => {
                    return <Movies key={movie.id} movie={movie} />;
                });
            })}
            <div ref={ref} style={{ marginTop: "50px" }}>
                <Spinner />
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
