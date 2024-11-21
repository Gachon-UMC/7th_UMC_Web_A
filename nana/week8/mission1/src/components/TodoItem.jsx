import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import styled from "styled-components";

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const { execute: deleteTodo, updateTodo } = useCustomFetch(`/todo/${todo.id}`, "DELETE");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedContent, setEditedContent] = useState(todo.content);

  // 수정 처리(update)
  const handleUpdate = async () => {
    const updatedTodo = { ...todo, title: editedTitle, content: editedContent };

    try {
      const response = await updateTodo(todo.id, updatedTodo); // 서버에 PATCH 요청
      if (response.ok) {
        onUpdateTodo(updatedTodo); // 부모 컴포넌트로 업데이트 데이터 전달
        setIsEditing(false); // 수정 완료 후 수정 모드 종료
      }
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  // 삭제 처리
  const handleDelete = async () => {
    try {
      await deleteTodo(); // Todo 삭제
      onDeleteTodo(todo.id); // 삭제된 Todo ID를 부모에 전달
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  // 체크박스 상태
  const handleCheckboxChange = async (event) => {
    const updatedTodo = { ...todo, checked: event.target.checked };

    try {
      const response = await updateTodo(todo.id, updatedTodo); // 서버에 PATCH 요청
      if (response.ok) {
        onUpdateTodo(updatedTodo); // 부모 컴포넌트에 변경된 체크 상태 전달
      }
    } catch (error) {
      console.error("체크박스 업데이트 실패:", error);
    }
  };

  return (
    <StyledTodoItem>
      <StyledContentWrapper>
        <StyledCheckbox
          type="checkbox"
          checked={todo.checked}
          onChange={handleCheckboxChange} // 체크박스 상태 변경 시 처리
        />
        {isEditing ? (
          <>
            <StyledInput
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <StyledTextarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </>
        ) : (
          <>
            <StyledTitle>{todo.title}</StyledTitle>
            <StyledContent>{todo.content}</StyledContent>
          </>
        )}
      </StyledContentWrapper>
      <ButtonGroup>
        {isEditing ? (
          <StyledButtonComplete onClick={handleUpdate}>수정완료</StyledButtonComplete>
        ) : (
          <StyledButton onClick={() => setIsEditing(true)}>수정</StyledButton>
        )}
        {!isEditing && (
          <StyledButton onClick={handleDelete}>삭제</StyledButton>
        )}
        {!isEditing && (
          <StyledLink to={`/todo/${todo.id}`}>
            <StyledButton>상세보기</StyledButton>
          </StyledLink>
        )}
      </ButtonGroup>
    </StyledTodoItem>
  );
};

export default TodoItem;

// CSS
const StyledTodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 25rem;
`
const StyledContentWrapper = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
`
const StyledTitle = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0;
`
const StyledContent = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
`
const StyledInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
`
const StyledTextarea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none; /* 크기 조정 방지 */
`
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`
const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #65b4dc;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #31a6e1;
  }

  &:active {
    background-color: #004080;
  }
`
const StyledButtonComplete = styled.button`
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #65b4dc;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #31a6e1;
  }

  &:active {
    background-color: #004080;
  }
`
const StyledCheckbox = styled.input`
  margin-right: 10px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`