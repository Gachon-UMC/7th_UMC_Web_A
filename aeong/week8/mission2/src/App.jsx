import styled from "styled-components";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTodoList, postTodo, deleteTodo, petchTodo } from "./apis/todo";
import { queryClient } from "./main";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(false);

  const { data: todos, isPending } = useQuery({
    queryFn: () => getTodoList({ title: search }),
    queryKey: ["todos", search],
  });

  const { mutate: postTodoMutation } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: petchTodoMutation } = useMutation({
    mutationFn: petchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, content);
    postTodoMutation({ title, content });
  };

  return (
    <>
      <h2>ToDo 검색</h2>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Form onSubmit={handleSubmit}>
        <Titleinput
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해 주세요"
        />
        <Contentinput
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해 주세요"
        />
        <CreateToDoButton type="submit">ToDo 생성</CreateToDoButton>
      </Form>
      {isPending ? (
        <div>로딩중</div>
      ) : (
        <Container>
          {todos[0]?.map((todo) => {
            return (
              <TodoContainer key={todo.id}>
                <input
                  type="checkbox"
                  defaultChecked={todo.checked}
                  onChange={(e) =>
                    petchTodoMutation({ id: todo.id, checked: !todo.checked })
                  }
                />

                <div>
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
                </div>
                <button onClick={() => deleteTodoMutation({ id: todo.id })}>
                  삭제
                </button>
              </TodoContainer>
            );
          })}
        </Container>
      )}
    </>
  );
}

export default App;

// CSS
const Input = styled.input`
  margin: 0.2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Titleinput = styled.input`
  padding: 0.5rem;
  margin: 0.2rem;
`;
const Contentinput = styled.input`
  padding: 0.5rem;
  margin: 0.2rem;
`;
const CreateToDoButton = styled.button``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TodoContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
