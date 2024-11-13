import Movies from "../components/movies";
import { useQuery } from "react-query";
import styled from "styled-components";
import useGetMovies from "../components/useGetMovies.jsx";
import Movielistskeleton from "../components/Movie/Movielistskeleton.jsx";

// const QueryNowplaying = async () => {
//     const response = await axiosInstance.get(
//         `/movie/now_playing?language=ko&page=1&region=KR`
//     );
//     return response.data.results;
// };

const Nowplaying = () => {
    const {
        data: movies,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["NowPlaying"],
        queryFn: () => useGetMovies({ category: "now_playing", pageParam: 1 }),
        cacheTime: 10000,
        staleTime: 10000,
    });
    console.log(movies);

    // 구조분해할당으로 안받으면
    // const queryresults = useQuery(["NowPlaying"], async () => {
    //     const response = await axiosInstance.get(
    //         `/movie/now_playing?language=ko&page=1&region=KR`
    //     );
    //     return response.data.results;
    // });
    // const data= queryresutls.data;
    //const isLoading = queryresults.isLoading;
    // 이런식으로 받아와야함

    if (isLoading) {
        // // return <div style={{ color: "white" }}>로딩중입니다..</div>;
        return <Movielistskeleton number={20} />;
        // return <h1>로딩중</h1>;
    }

    if (isError) {
        return <div style={{ color: "white" }}>에러를</div>;
    }

    return (
        <NowplayingDiv>
            {movies?.map((movie) => {
                return <Movies key={movie.id} movie={movie} />;
            })}
        </NowplayingDiv>
    );
};

export default Nowplaying;

//css
const NowplayingDiv = styled.div`
    background-color: pink;
    margin-left: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
