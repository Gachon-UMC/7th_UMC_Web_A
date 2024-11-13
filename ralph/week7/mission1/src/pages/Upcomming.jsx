import { useQuery } from "react-query";
import Movies from "../components/movies";
import styled from "styled-components";
import Movielistskeleton from "../components/Movie/Movielistskeleton";
import useGetMovies from "../components/useGetMovies";

// const QueryUpcoming = async () => {
//     const response = await axiosInstance.get(
//         `/movie/upcoming?language=ko&page=1&region=KR`
//     );
//     return response.data.results;
// };

const Upcoming = () => {
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
        <UpcommingDiv>
            {movies?.map((movie) => {
                return <Movies key={movie.id} movie={movie} />;
            })}
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
