import styled from "styled-components";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const [searchParams, setSearchParams] = useSearchParams({
    mq: "",
  });

  const mq = searchParams.get("mq");

  const handleSearchMovie = () => {
    if (mq === searchValue) {
      return;
    }
    navigate(`/search?mq=${searchValue}`);
  };

  const handleSearchMovieWithKeyboard = (e) => {
    if (e.key === "Enter") {
      handleSearchMovie();
    }
  };

  const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;

  const { data: movies, isLoading, isError } = useCustomFetch(url);

  console.log(movies);

  return (
    <SearchContainer>
      <input
        placeholder="영화 제목을 입력해 주세요."
        value={searchValue}
        onChange={onChangeSearchValue}
        onKeyDown={handleSearchMovieWithKeyboard}
      />
      <button onClick={handleSearchMovie}>검색</button>
    </SearchContainer>
  );
};

export default SearchPage;

// CSS
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;
