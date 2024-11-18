import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import useGetMovies from "../components/useGetMovies";
// const QueryToprated = async () => {
//     const getdata = await axiosInstance.get(
//         `/movie/top_rated?language=ko&page=1&region=KR`
//     );
//     return getdata.data.results;
// };

const Toprated = () => {
    const {
        data: movies,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["top_rated"],
        queryFn: () => useGetMovies({ category: "top_rated", pageParam: 1 }),
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
        <TopratedDiv>
            {movies?.map((movie) => {
                return <Movies key={movie.id} movie={movie} />;
            })}
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
