import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axios-instance";

const ToDoDetailPage = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axiosInstance.get(`/todo/${id}`);
        setTodo(response.data);
      } catch (error) {
        console.error("Error fetching todo details:", error);
      }
    };
    fetchTodo();
  }, [id]);

  if (!todo) return <div>Loading...</div>;

  return (
    <DetailContainer>
      <ToDoId>ID: {todo.id}</ToDoId>
      <Title>Title: {todo.title}</Title>
      <Content>Content: {todo.content}</Content>
      <Check>Checked: {todo.checked ? "Yes" : "No"}</Check>
    </DetailContainer>
  );
};

export default ToDoDetailPage;

// CSS
const DetailContainer = styled.div``;
const ToDoId = styled.div``;
const Title = styled.div``;
const Content = styled.div``;
const Check = styled.div``;
