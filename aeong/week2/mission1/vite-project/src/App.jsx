import { useState } from "react";
import "./App.css";
import Input from "./Input"; // Input 컴포넌트 import
import Button from "./Button";

function App() {
  // 투두리스트, 화면에 출력되는 (추가, 삭제, 수정)
  const [todos, setTodos] = useState([
    { id: 1, task: "투두 만들어보기" },
    { id: 2, task: "희연 해원 해윤 건 찬민" },
  ]);

  const [text, setText] = useState("");

  const [editingId, setEditingId] = useState("");
  const [editText, setEditText] = useState("");

  //렌더링 방치
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //1. 추가하기
  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) * 2, task: text },
    ]);
    setText("");
  };

  //2. 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  //3. 수정하기
  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/*Input 컴포넌트*/}
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        {/*Button 컴포넌트*/}
        <Button onClick={() => addTodo()} text="할 일 등록" />
      </form>
      <div>
        {todos.map((todo, _) => (
          <div
            className="container"
            key={todo.id}
            style={{ display: "flex", gap: "20px" }}
          >
            {/* 수정이 아닐때 */}
            {editingId !== todo.id && (
              <div key={todo.id} style={{ display: "flex", gap: "5px" }}>
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            )}
            {/* 수정중 상태일때 */}
            {editingId === todo.id && (
              <div key={todo.id} style={{ display: "flex", gap: "5px" }}>
                <p>{todo.id}.</p>
                {/*Input 컴포넌트*/}
                <Input
                  defaultValue={todo.task}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            )}
            <button
              className="delete-button"
              onClick={() => deleteTodo(todo.id)}
            >
              삭제하기
            </button>

            {editingId === todo.id ? (
              <button
                className="edit-complete-button"
                onClick={() => updateTodo(editingId, editText)}
              >
                수정 완료
              </button>
            ) : (
              <button
                className="edit-button"
                onClick={() => setEditingId(todo.id)}
              >
                수정 진행
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
