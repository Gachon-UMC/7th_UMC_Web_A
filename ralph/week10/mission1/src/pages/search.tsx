import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchMovieList from "../components/Movie/search-movie-list";

const search = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const navigate = useNavigate();

    // 수정
    // event의 type 선언
    //input 태그에다가 input 안의 값이 바뀔 때마다 searchvalue state가 변하니까 React.ChangeEvent<HTMLInputElement> 이런식으로 type 선언

    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    const [searchParams, setSearchParams] = useSearchParams({ mq: " " });
    const mq = searchParams.get("mq");
    const handleSearchMovie = () => {
        if (mq === searchValue) return;
        navigate(`./search?mq=${searchValue}`);
    };

    //수정
    //event의 type 선언
    // Button 태그에다가 Enter 키 누를때 작동하는 event 이므로 React.KeyboardEvent<HTMLInputElement> 이렇게 event 의 type 을 선언

    const handleSearchMovieWithKeyboard = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            handleSearchMovie();
        }
    };

    return (
        <div>
            <>
                <input
                    placeholder="영화 제목을 입력해주세요"
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    onKeyUp={handleSearchMovieWithKeyboard}
                />
                <button onClick={handleSearchMovie}>검색</button>
            </>
            <SearchMovieList searchValue={searchValue} />
        </div>
    );
};

export default search;

//css
