import styled from "styled-components";

const SearchBar = () => {
    return (
        <SearchBarContainer>
            <input type="text" placeholder="검색 값을 입력해주세요." />
        </SearchBarContainer>
    );
};

const SearchBarContainer = styled.form`
    & > input {
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
        padding-left: 10px;
    }
`;

export default SearchBar;
