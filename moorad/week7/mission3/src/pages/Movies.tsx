import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import getMoviesData from "../apis/getMoviesData";
import { useState } from "react";

interface MovieType {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

const Movies = () => {
    const location = useLocation();
    // upcoming,popular
    const apiAddress = location.state.value;

    const [pageParam, setPageParam] = useState<number>(1);

    const { isLoading, data, error } = useQuery({
        queryKey: ["movieData", apiAddress, pageParam],
        queryFn: async () => getMoviesData(apiAddress, pageParam),
    });

    const movies = data?.results;

    if (isLoading) {
        return <div>Loading중..</div>;
    }

    if (error) {
        return <div>Error남..</div>;
    }

    return (
        <>
            <MainContents>
                {movies?.map((movie: MovieType) => {
                    return <Card key={movie.id} movie={movie}></Card>;
                })}
            </MainContents>
            <ButtonContainer>
                <Button
                    onClick={() => {
                        pageParam > 1 && setPageParam((prev) => prev - 1);
                    }}
                    disabled={pageParam === 1}
                >
                    이전
                </Button>
                <span>{pageParam}</span>
                <Button
                    onClick={() => {
                        pageParam < data?.totalPage &&
                            setPageParam((prev) => prev + 1);
                    }}
                    disabled={pageParam === data?.totalPage - 1}
                >
                    다음
                </Button>
            </ButtonContainer>
        </>
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
    overflow: hidden;
    height: calc(100vh - 5rem);

    & > .bottomRef {
        width: 20px;
    }
`;

const ButtonContainer = styled.div`
    width: 100%;
    height: 4rem;
    border: 1px solid red;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    width: 4rem;
    height: 2rem;
    background-color: ${({ disabled }) => (disabled ? "gray" : "red")};
    color: ${({ disabled }) => (disabled ? "darkgray" : "white")};
    border: none;
    margin: 0 1rem;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

    &:hover {
        background-color: ${({ disabled }) => (disabled ? "gray" : "white")};
        color: ${({ disabled }) => (disabled ? "darkgray" : "red")};
    }
`;
export default Movies;
