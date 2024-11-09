import styled from "@emotion/styled";
import { searchMovieInstance } from "../apis/getMovieAPI";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const Search = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const { debouncedValue: debouncedQuery, loading } = useDebounce(query, 800); // 디바운스된 값

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value); // 입력 값 업데이트
    };

    // debouncedQuery가 변경될 때만 API 요청
    useEffect(() => {
        if (debouncedQuery.trim() === "") return;
        const fetchMovies = async () => {
            try {
                const res = await searchMovieInstance.get("", {
                    params: {
                        query: debouncedQuery,
                        include_adult: true,
                        language: "ko-KR",
                        page: 1,
                    },
                });
                setMovies(res.data.results);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMovies();
    }, [debouncedQuery]);
    return (
        <>
            <Container>
                <input
                    type="text"
                    placeholder="영화 제목을 입력해주세요.."
                    onChange={handleInputChange}
                />
                <button>검색</button>
            </Container>
            <ContentsContainer
                loading={loading}
                query={debouncedQuery}
                movies={movies}
            ></ContentsContainer>
        </>
    );
};

const ContentsContainer = ({ loading, query, movies }) => {
    return (
        <MainContents>
            {movies.length === 0 ? (
                <h1>{query} 검색 결과가 없습니다.</h1>
            ) : (
                movies.map((movie) => {
                    return (
                        <Card
                            key={movie.id}
                            loading={loading}
                            movie={movie}
                        ></Card>
                    );
                })
            )}
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
const Container = styled.div`
    width: 90vw;
    display: flex;
    align-items: center;
    margin-top: 0.5rem;

    & > input {
        width: 90%;
        height: 2rem;
        padding-left: 10px;
        border-radius: 5px;
        margin-left: 0.3rem;
    }

    & > button {
        width: 8%;
        height: 2.3rem;
        font-size: 1rem;
        background-color: red;
        color: white;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        margin-left: 0.3rem;

        &:hover {
            color: red;
            background-color: white;
        }
    }
`;

export default Search;
