import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTodoAPI } from "../apis/axios-instance";
import styled from "styled-components";

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Mutation
  const { mutate, isLoading, error } = useMutation({
    mutationFn: createTodoAPI,  // ToDo 생성 함수
    onSuccess: (newTodo) => {
      onAddTodo(newTodo);  // 새로 생성된 Todo 추가
      setTitle("");        // 입력 필드 초기화
      setContent("");      // 입력 필드 초기화
    },
    onError: (err) => {
      console.error("Error creating Todo:", err);
    },
  });
  
  // ToDo생성 제출 핸들러
  const handleSubmit = (e) => {
    // 기본 제출 동작 방지
    e.preventDefault();
    // 제목, 내용이 비어있지 않을 때만 실행
    if (title.trim() && content.trim()) {
      mutate({ title, content }); // 새로운 Todo 데이터 전송
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputTitle
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputContent
        type="text"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <SubmitButton type="submit" disabled={isLoading || !title.trim() || !content.trim()}>
        {isLoading ? "로딩 중..." : "ToDo 생성"} {/* 로딩 상태에서 텍스트 변경 */}
      </SubmitButton>
      {error && <ErrorText>Error: {error.message}</ErrorText>} {/* 에러 메시지 표시 */}
    </form>
  );
};

export default TodoForm;

// CSS
const InputTitle = styled.input`
  margin-top: 5rem;
  flex: 1;
  display: block;
  padding: 0.8rem 10rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`
const InputContent = styled.input`
  margin-top: 0.5rem;
  flex: 1;
  display: block;
  padding: 0.8rem 10rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`
const SubmitButton = styled.button`
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.8rem 12.8rem;
  background-color: #65b4dc;
  font-size: 1rem;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ddd;
  }
`
const ErrorText = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 1rem;
`