import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteTodoAPI, updateTodoAPI } from "../apis/axios-instance";

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedContent, setEditedContent] = useState(todo.content);

  // Todo 삭제 useMutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteTodoAPI(todo.id);
    },
    onSuccess: () => {
      // 'todos' 데이터 새로고침 -> UI 리렌더링
      queryClient.invalidateQueries(["todos"]); // todos 데이터 새로고침
    },
  });

  // Todo 업데이트 useMutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      await updateTodoAPI(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]); // todos 데이터 새로고침
      setIsEditing(false); // 수정 종료
    },
  });

  // 수정 처리 핸들러
  const handleUpdate = () => {
    updateMutation.mutate({
      id: todo.id,            // 업데이트할 Todo ID
      title: editedTitle,     // 수정된 제목
      content: editedContent, // 수정된 내용
    });
  };

  // 체크박스 상태(true, false)
  const handleCheckboxChange = (event) => {
    updateMutation.mutate({
      id: todo.id,
      checked: event.target.checked,
    });
  };

  return (
    <StyledTodoItem>
      <StyledContentWrapper>
        <StyledCheckbox
          type="checkbox"
          checked={todo.checked}
          onChange={handleCheckboxChange}
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
          <StyledButton onClick={() => deleteMutation.mutate()}>삭제</StyledButton>
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