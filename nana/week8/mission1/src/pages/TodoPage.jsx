import React, { useState, useEffect } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import SearchBar from "../components/SearchBar"; 
import styled from "styled-components";
import { HashLoader } from "react-spinners";
import { PacmanLoader } from "react-spinners"; 

const TodoPage = () => {
  const [todos, setTodos] = useState([]); // 전체 TODO 목록
  const [filteredTodos, setFilteredTodos] = useState([]); // 검색된 TODO 목록
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const { execute: fetchTodos } = useCustomFetch("/todo");

  // TODO 데이터 로드
  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTodos(); // 전체 데이터를 가져옵니다.
        setTodos(data[0] || []); // 전체 TODO 목록 저장
        setFilteredTodos(data[0] || []); // 초기 상태로 전체 TODO를 표시
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []); // 초기 로드 시 한 번만 실행

  // 검색 핸들러
  const handleSearch = (query) => {
    setSearchQuery(query); // 검색어 상태 업데이트
  };

  // 검색어가 변경될 때마다 필터링된 투두 목록 업데이트
  useEffect(() => {
    if (searchQuery) {
      const filtered = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) // 제목에서 검색어를 포함한 투두만 필터링
      );
      setFilteredTodos(filtered);
    } else {
      setFilteredTodos(todos); // 검색어가 없으면 전체 투두 목록 표시
    }
  }, [searchQuery, todos]); // searchQuery 또는 todos가 변경될 때마다 실행

  if (loading) {
    return (
      <SpinnerWrapper>
        <HashLoader color="#65B4DC" loading={loading} size={80} />
        <LoadingText>게시글을 불러오는 중입니다...</LoadingText>
      </SpinnerWrapper>
    );
  }

  if (error) {
    return (
      <ErrorWrapper>
        <PacmanLoader color="#65B4DC" size={80} />
        <ErrorText>
          <p>에러가 발생했습니다!</p>
        </ErrorText>
      </ErrorWrapper>
    );
  }

  return (
    <StyledDiv>
      <StyledTitle>UMC ToDoList</StyledTitle>
      <TodoForm onAddTodo={(newTodo) => setTodos((prev) => [...prev, newTodo])} />
      <SearchBar onSearch={handleSearch} /> {/* 검색 바 추가 */}
      <TodoList
        todos={filteredTodos} // 필터링된 투두 목록 전달
        onUpdateTodo={(updatedTodo) => // 문제 : 엉킬수도있음.... id가 다름?
          setTodos((prev) =>
            prev.map((todo) =>
              todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
            )
          )
        }
        onDeleteTodo={(id) => setTodos((prev) => prev.filter((todo) => todo.id !== id))}
      />
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
