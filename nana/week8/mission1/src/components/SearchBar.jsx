import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // 검색어 입력 처리
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // 입력값 업데이트
  };

  // 검색 버튼 클릭하면 호출
  const handleSearch = () => {
    // console.log("검색어:", query); // 검색어 콘솔 확인
    onSearch(query); // 부모 컴포넌트로 검색어 전달
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Search todos..."
        value={query}
        onChange={handleChange}
      />
      <SearchButton onClick={handleSearch}>검색</SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;

// CSS
const SearchBarContainer = styled.div`
    display: flex;
    gap: 0.2rem;
`
const SearchInput = styled.input`
  padding: 0.8rem 0.9rem;
  width: 25rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
`
const SearchButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #65b4dc;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #4fa0cf;
  }

  &:active {
    background-color: #3a8bb9;
  }
`