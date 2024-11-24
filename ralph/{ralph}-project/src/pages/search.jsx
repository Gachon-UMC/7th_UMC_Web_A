import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchMovieList from "../components/Movie/search-movie-list";

const search = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    var timer;
    const onChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
    };
    const [searchParams, setSearchParams] = useSearchParams({ mq: " " });
    const mq = searchParams.get("mq");
    const handleSearchMovie = () => {
        if (mq === searchValue) return;
        navigate(`./search?mq=${searchValue}`);
    };
    const handleSearchMovieWithKeyboard = (e) => {
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
