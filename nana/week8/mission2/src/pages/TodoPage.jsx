import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import { HashLoader } from "react-spinners";
import { PacmanLoader } from "react-spinners";
import { fetchTodosAPI } from "../apis/axios-instance";

const TodoPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [filteredTodos, setFilteredTodos] = useState([]); // 검색된 TODO 목록

  // Todos 데이터 가져오기
  const { data: todos = [], isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodosAPI,
  });

  // 검색 핸들러
  const handleSearch = (query) => {
    setSearchQuery(query); // 검색어 상태 업데이트
  };

  // 검색어가 변경될 때 필터링된 투두 목록 업데이트
  useEffect(() => {
    if (searchQuery) {
      // 검색어가 있을 경우 제목에 검색어가 포함된 Todo만 필터링
      const filtered = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTodos(filtered);
    } else {
      setFilteredTodos(todos); // 검색어가 없으면(입력X) 전체 투두 목록 표시
    }
  }, [searchQuery, todos]);

  // Todo 추가
  const handleAddTodo = (newTodo) => {
    // 이전 Todo 목록에 새로운 Todo를 추가
    setFilteredTodos((prevTodos) => [...prevTodos, newTodo]); // 새로운 Todo 목록에 추가
  };

  // 로딩 처리(스피너 사용)
  if (isLoading) {
    return (
      <SpinnerWrapper>
        <HashLoader color="#65B4DC" size={80} />
        <LoadingText>게시글을 불러오는 중입니다...</LoadingText>
      </SpinnerWrapper>
    );
  }

  // 에러 처리(스피너 사용)
  if (isError) {
    return (
      <ErrorWrapper>
        <PacmanLoader color="#65B4DC" size={80} />
        <ErrorText>
          <p>에러가 발생했습니다: {error.message}</p>
        </ErrorText>
      </ErrorWrapper>
    );
  }

  return (
    <StyledDiv>
      <StyledTitle>UMC ToDoList</StyledTitle>
      <TodoForm onAddTodo={handleAddTodo} />
      <SearchBar onSearch={handleSearch} />
      <TodoList todos={filteredTodos} />
    </StyledDiv>
  );
};

export default TodoPage;

// CSS
const StyledTitle = styled.h3`
  margin-top: 5rem;
  font-size: 2.5rem;
`
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`
const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 중앙 정렬 */
`
const LoadingText = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #333;
`
const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const ErrorText = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 2rem;
`