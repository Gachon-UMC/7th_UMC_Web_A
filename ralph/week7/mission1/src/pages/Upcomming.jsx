import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import { axiosInstance } from "../apis/axios-instance";
import UseGetMovies from "../components/useGetMovies";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import useGetInfiniteMovies from "../components/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

// const QueryUpcoming = async () => {
//     const response = await axiosInstance.get(
//         `/movie/upcoming?language=ko&page=1&region=KR`
//     );
//     return response.data.results;
// };

const Upcoming = () => {
    const { data, isError, isLoading, hasNextPage, isFetching, fetchNextPage } =
        useGetInfiniteMovies("upcoming");

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
        <UpcommingDiv>
            {data?.pages.map((page) => {
                return page.map((movie) => {
                    return <Movies key={movie.id} movie={movie} />;
                });
            })}
            <div ref={ref} style={{ marginTop: "50px" }}>
                <Spinner />
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
