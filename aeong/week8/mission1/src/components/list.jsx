import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

const List = ({ todos, deleteTodo, updateTodo }) => {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const handleModifyClick = (todo) => {
    setEditingTodoId(todo.id);
    setEditTitle(todo.title);
    setEditContent(todo.content);
  };

  const handleCompleteClick = (id) => {
    updateTodo(id, editTitle, editContent);
    setEditingTodoId(null);
  };

  return (
    <>
      {todos.map((todo) => (
        <Container>
          <CheckBox type="checkbox" />
          <InputContainer>
            <Titleinput
              value={editingTodoId === todo.id ? editTitle : todo.title}
              onChange={(e) => setEditTitle(e.target.value)}
              disabled={editingTodoId !== todo.id}
            />
            <Contentinput
              value={editingTodoId === todo.id ? editContent : todo.content}
              onChange={(e) => setEditContent(e.target.value)}
              disabled={editingTodoId !== todo.id}
            />
          </InputContainer>
          <ButtonContainer>
            {editingTodoId === todo.id ? (
              <CompleteButton onClick={() => handleCompleteClick(todo.id)}>
                수정 완료
              </CompleteButton>
            ) : (
              <>
                <ModifyButton onClick={() => handleModifyClick(todo)}>
                  수정
                </ModifyButton>
                <DeleteButton onClick={() => deleteTodo(todo.id)}>
                  삭제
                </DeleteButton>
                <Link to={`/todo/${todo.id}`}>
                  <DetailButton>상세</DetailButton>
                </Link>
              </>
            )}
          </ButtonContainer>
        </Container>
      ))}
    </>
  );
};

export default List;

// CSS
const Container = styled.div`
  display: flex;
  gap: 2rem;
  margin: 0.25rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const CheckBox = styled.input``;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Titleinput = styled.input`
  border: none;
  width: 100%;
  padding: 0.5rem;
  background: none;
`;

const Contentinput = styled.input`
  border: none;
  width: 100%;
  padding: 0.5rem;
  background: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ModifyButton = styled.button``;
const DeleteButton = styled.button``;
const CompleteButton = styled.button``;
const DetailButton = styled.button``;
