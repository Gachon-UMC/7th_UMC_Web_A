import React from "react";
import InputTodo from "./components/InputTodo"; // InputTodo 컴포넌트 경로에 맞게 설정
import TodoList from "./components/TodoList"; // TodoList 컴포넌트 경로에 맞게 설정

function App() {
  return (
    <div>
      <InputTodo />
      <TodoList />
    </div>
  );
}

export default App;
