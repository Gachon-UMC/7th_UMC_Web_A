import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import useGetMovies from "../components/useGetMovies";
const Popular = () => {
    const {
        data: movies,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["popular"],
        queryFn: () => useGetMovies({ category: "popular", pageParam: 1 }),
        cacheTime: 10000,
        staleTime: 10000,
    });

    if (isLoading) {
        return <Movielistskeleton number={20} />;
    }
    if (isError) {
        return <div style={{ color: "white" }}>에러를</div>;
    }
    return (
        <PopularDiv>
            {movies?.map((movie) => {
                return <Movies key={movie.id} movie={movie} />;
            })}
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
