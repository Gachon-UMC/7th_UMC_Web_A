import Movies from "../movies";
import { useSearchParams } from "react-router-dom";
import useCustomfetch from "../../hooks/useCustomfetch";
import styled from "styled-components";
import Movielistskeleton from "./Movielistskeleton";
import * as S from "../skeleton/movieSkeletonstyle";
import { Movie } from "../../types/movieTypes";

// 수정

// props의 type을 string으로 지정
// 내가 useGetMovieData 컴포넌트 24 번째 줄에서 일관성있게 type을 선언하는게 중요하다고 했는데 이렇게 props 로 값을 받을 때는 type 선언을 해줘야함
// props 타입 지정은 필수가 아니라 선택 사항이지만, type 선언하는게 좋음
// 만약 props로 받는 값의 type을 선언하지 않으면 type 을 any 로 간주하기 때문에 문제가 발생 할 수 있다.
// 여기서 중요한게 TypeScript는 props로 받는 값의 타입을 자동으로 추적하지 않습니다.
// 이 뜻이 뭐냐면 search 컴포넌트에서 const [searchValue, setSearchValue] = useState<string>(""); 이렇게 미리 type을 string 으로 하고 <SearchMovieList searchValue={searchValue} /> 이렇게 props로 넘겨줘도 이 컴포넌트에서 받을 때 searchValue 의 type은 any로 바뀌게 된다.

const SearchMovieList = ({ searchValue }: { searchValue: string }) => {
    const [searchParams, setSearchParams] = useSearchParams({ mq: " " });
    const mq = searchParams.get("mq");

    const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
    const { data: movies, isLoading, isError } = useCustomfetch(url);
    console.log(movies);
    if (isLoading) {
        return (
            <div>
                <S.Edward>
                    <Movielistskeleton number={20} />
                </S.Edward>
            </div>
        );
    }
    if (isError) {
        return <h1>에러처리</h1>;
    }
    if (searchValue && movies?.length === 0) {
        return (
            <div>
                <h1 style={{ color: "white" }}>
                    해당하는 검색 {searchValue}에
                </h1>

                <h1 style={{ color: "white" }}>해당하는 데이터가 없습니다.</h1>
            </div>
        );
    }
    return (
        <MovieWrapper>
            {movies?.map((movie: Movie) => (
                <Movies key={movie.id} movie={movie} />
            ))}
        </MovieWrapper>
    );
};

export default SearchMovieList;

//css
const MovieWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
    gap: 1.25em;
    padding: 1.25em;
    justify-content: center;
    align-items: start;
`;
