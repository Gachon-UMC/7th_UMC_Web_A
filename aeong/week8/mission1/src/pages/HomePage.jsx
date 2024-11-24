import styled from "styled-components";
import Title from "../components/title";
import Input from "../components/input";
import List from "../components/list";
import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";
import { PulseLoader, PacmanLoader } from "react-spinners";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const { data, isLoading, isError } = useCustomFetch("/todo");

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  if (isLoading) {
    return <PulseLoader />;
  }

  if (isError) {
    return <PacmanLoader color="red" />;
  }

  // 생성하기
  const createTodo = async (title, content) => {
    try {
      const response = await axiosInstance.post("/todo", { title, content });
      const newTodo = { id: response.data.id, title, content };

      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      console.error("생성 에러", error);

      alert("생성 실패");
    }
  };

  // 삭제하기
  const deleteTodo = async (id) => {
    await axiosInstance.delete(`/todo/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 수정하기
  const updateTodo = async (id, title, content) => {
    try {
      await axiosInstance.patch(`/todo/${id}`, { title, content });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title, content } : todo
        )
      );
    } catch (error) {
      console.error("수정 에러", error);
      alert("수정 실패");
    }
  };

  return (
    <Container>
      <Title />
      <Input createTodo={createTodo} />
      <ListContainer>
        <List todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      </ListContainer>
    </Container>
  );
};

export default HomePage;

// CSS
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
