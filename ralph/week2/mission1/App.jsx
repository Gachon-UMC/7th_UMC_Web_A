import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: '투두 만들어보기' },
    { id: 2, task: '희연 혜원 혜윤 건 찬민' },
  ]);

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (text.trim().length === 0) return;
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <Input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="todo-input"
        />
        <Button onClick={addTodo} type="submit" className="todo-add-btn">할 일 등록</Button>
      </form>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item" style={{ display: 'flex', gap: '20px' }}>
            {editingId !== todo.id && (
              <div style={{ display: 'flex', gap: '5px' }}>
                <p className="todo-id">{todo.id}</p>
                <p className="todo-task">{todo.task}</p>
              </div>
            )}
            {editingId === todo.id && (
              <div style={{ display: 'flex', gap: '5px' }}>
                <p className="todo-id">{todo.id}</p>
                <Input 
                  defaultValue={todo.task}
                  onChange={(e) => setEditText(e.target.value)}
                  className="todo-edit-input"
                />
              </div>
            )}
            <Button onClick={() => deleteTodo(todo.id)} className="todo-delete-btn">삭제하기</Button>
            {editingId === todo.id ? (
              <Button onClick={() => updateTodo(editingId, editText)} className="todo-update-btn">수정 완료</Button>
            ) : (
              <Button onClick={() => setEditingId(todo.id)} className="todo-edit-btn">수정 진행</Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
