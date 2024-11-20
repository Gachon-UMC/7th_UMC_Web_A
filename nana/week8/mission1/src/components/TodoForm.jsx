import React, { useState } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";
import styled from "styled-components";

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { execute, loading, error } = useCustomFetch("/todo", "POST");

  // Form 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
  
    // POST 요청
    const newTodo = await execute(null, { title, content }); // body에 데이터 전달
    if (newTodo) {
      onAddTodo(newTodo); // 새로 추가된 Todo를 부모 컴포넌트로 전달하여 목록 갱신
      setTitle(""); // 제목 입력 필드 초기화
      setContent(""); // 내용 입력 필드 초기화
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
      <SubmitButton type="submit" disabled={loading || !title.trim() || !content.trim()}>ToDo 생성</SubmitButton>
      {error && <p>Error: {error.message}</p>}
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
  background-color: #65B4DC;
  font-size: 1rem;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ddd;
  }
`