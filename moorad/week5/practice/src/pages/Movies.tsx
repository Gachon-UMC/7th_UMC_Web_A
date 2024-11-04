import { useLocation } from "react-router-dom";
import styled from "styled-components";
import useGetAPI from "../hooks/useGetAPI";
import Card from "../components/Card";

const Movies = () => {
    const location = useLocation();
    const apiAddress = location.state.value;
    // upcoming,popular
    const { datas: movies, isLoading, isError } = useGetAPI(apiAddress);

    if (isLoading) {
        return <div>Loading중..</div>;
    }

    if (isError) {
        return <div>Error남..</div>;
    }

    return (
        <MainContents>
            {movies.map((movie) => {
                return <Card key={movie.id} movie={movie}></Card>;
            })}
        </MainContents>
    );
};

const MainContents = styled.main`
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 30px;
    column-gap: 5px;
    @media (max-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
    }
    overflow: scroll;
    height: calc(100vh - 5rem);
`;

export default Movies;
