import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // useNavigate import
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { updateTodoAPI, deleteTodoAPI } from "../apis/axios-instance";

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedContent, setEditedContent] = useState(todo.content);

  const navigate = useNavigate(); // navigate 훅 사용

  // Todo 삭제 useMutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      try {
        await deleteTodoAPI(todo.id); // 에러를 처리할 수 있도록 추가
      } catch (error) {
        console.error("Todo 삭제 실패:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // Todo 업데이트 useMutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      try {
        await updateTodoAPI(data); // 에러를 처리할 수 있도록 추가
      } catch (error) {
        console.error("Todo 업데이트 실패:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setIsEditing(false);
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

  // Todo 항목 클릭 시 상세보기 페이지로 이동
  const handleTodoClick = () => {
    navigate(`/todo/${todo.id}`);  // 상세보기 페이지로 이동
  };

  // 이벤트 버블링 방지
  const handleStopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <StyledTodoItem onClick={handleTodoClick}> {/* onClick을 TodoItem에 적용 */}
      <StyledContentWrapper>
        <StyledCheckbox
          type="checkbox"
          checked={todo.checked}
          onChange={handleCheckboxChange}
          onClick={handleStopPropagation} // 이벤트 전파 막기
        />
        {isEditing ? (
          <>
            <StyledInput
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onClick={handleStopPropagation} // 이벤트 전파 막기
            />
            <StyledTextarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              onClick={handleStopPropagation} // 이벤트 전파 막기
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
          <StyledButtonComplete onClick={(e) => { handleUpdate(); handleStopPropagation(e); }}>수정완료</StyledButtonComplete>
        ) : (
          <StyledButton onClick={(e) => { setIsEditing(true); handleStopPropagation(e); }}>수정</StyledButton>
        )}
        {!isEditing && (
          <StyledButton onClick={(e) => { deleteMutation.mutate(); handleStopPropagation(e); }}>삭제</StyledButton>
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
  cursor: pointer;  // 클릭할 수 있도록 커서 변경
  &:hover {
    background-color: #f4f4f4;
  }
`;

const StyledContentWrapper = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
`;

const StyledTitle = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const StyledContent = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StyledTextarea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none; /* 크기 조정 방지 */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

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
`;

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
`;

const StyledCheckbox = styled.input`
  margin-right: 10px;
`;
