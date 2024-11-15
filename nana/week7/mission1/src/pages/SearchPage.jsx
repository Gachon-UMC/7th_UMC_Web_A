import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { debounce } from 'lodash';
import SearchMovieList from './search-movie-list';

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    // debounce 함수 생성 - 함수가 매번 새로 생성되지 않도록 useCallback으로 감쌉니다.
    const debouncedSearch = useCallback(
        debounce((query) => {
            if (query) {
                navigate(`/search?mq=${query}`);
            }
        }, 800),
        [navigate] // navigate 의존성 추가
    );

    // searchValue가 변경될 때마다 debouncedSearch 호출
    useEffect(() => {
        if (searchValue) {
            debouncedSearch(searchValue);
        }

        // 컴포넌트가 언마운트 될 때 debouncedSearch 함수의 타이머를 정리해줍니다.
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchValue, debouncedSearch]);

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <SearchContainer>
            <SearchForm onSubmit={(e) => e.preventDefault()}>
                <SearchInput 
                    placeholder="영화 제목을 입력하세요..." 
                    value={searchValue} 
                    onChange={handleSearchInputChange}
                />
                <SearchButton onClick={() => debouncedSearch(searchValue)}>검색</SearchButton>
            </SearchForm>

            <MovieResults>
                <SearchMovieList searchValue={searchValue} />
            </MovieResults>
        </SearchContainer>
    );
};

export default SearchPage;

// 스타일링 (Styled-components)
const SearchContainer = styled.div`
    padding: 2rem;
    color: white;
`;

const SearchForm = styled.form`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
`;

const SearchInput = styled.input`
    padding: 1rem;
    width: 80%;
    border-radius: 4px 0 0 4px;
    border: none;
    font-size: 1rem;
    color: #333;
`;

const SearchButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #f82f62;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;

    &:hover {
        background-color: #ff547e;
    }
`;

const MovieResults = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;
