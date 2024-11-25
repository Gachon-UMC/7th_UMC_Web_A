import { useCallback } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { useSetRecoilState } from "recoil";
import { searchValueState } from "../shared/recoil/searchValueState";
const SearchBar = () => {
    const setSearchValue = useSetRecoilState(searchValueState);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    // useCallback을 이용해 debounce timer가 매번 초기화되지 않도록 사용.
    const debouncedOnChange = useCallback(debounce(handleChange, 500), []);

    return (
        <SearchBarContainer>
            <input
                type="text"
                placeholder="검색 값을 입력해주세요."
                onChange={debouncedOnChange}
            />
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
