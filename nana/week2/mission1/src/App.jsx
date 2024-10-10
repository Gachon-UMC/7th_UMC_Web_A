import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
  ]);
  
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

// 1. 추가하기
const addTodo = () => {
  if (text.trim().length === 0) return;
  setTodos((prev) => [
    ...prev, 
    { id: Math.floor(Math.random() * 100) + 2, task: text },
  ]);
  setText('');
};

// 2. 삭제하기
const deleteTodo = (id) => {
  setTodos((prev) => prev.filter((item) => item.id !== id));
};

// 3. 수정하기
const updateTodo = (id, text) => {
  setTodos((prev) =>
    prev.map((item) => (item.id === id ? {...item, task:text} : item))
  );
  setEditingId('');
};

  return (
    <>
      <Add text={text} setText={setText} addTodo={addTodo} />
      <DelEdit
        todos={todos}
        deleteTodo={deleteTodo}
        editingId={editingId}
        setEditingId={setEditingId}
        editText={editText}
        setEditText={setEditText}
        updateTodo={updateTodo}
      />
    </>
  );
  
}

/* ===================== */

function Add({text, setText, addTodo}) {
  //렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input className='input' type='text' value={text} onChange={(e) => setText(e.target.value)} />
      <button className="button1" onClick={() => addTodo()} type='submit'>할 일 등록</button>
    </form>    
  );
};

/* ==================== */

function DelEdit({todos, editingId, setEditingId , editText, setEditText, deleteTodo, updateTodo}) {

  return ( 
    <div>
      {todos.map((todo, _) => (
        <div key={todo.id} style={{display: 'flex', gap: '20px'}}>
          {/* 수정이 아닐 때 */}
          {editingId !== todo.id && (
            <div style={{display: 'flex', gap: '5px' }}>
              <p className='idkey'>{todo.id}</p>
              <p className='key'>{todo.task}</p>
            </div>
          )}
          {/* 수정 중 상태일 때 */}
          {editingId === todo.id && (
            <div style={{display: 'flex', gap: '5px' }}>
                <p className='idkey'>{todo.id}</p>
              <input className='input'
                defaultValue={todo.task}
                onChange={(e) => setEditText(e.target.value)}
              />
            </div>
          )}
          <button className="button2" onClick={() => deleteTodo(todo.id)}>삭제하기</button>
          {editingId === todo.id ? (
            <button className="button1" onClick={() => updateTodo(editingId, editText)}>수정 완료</button>
          ) : (
            <button className="button1" onClick={() => setEditingId(todo.id)}>수정 진행</button>
          )}
        </div>
      ))}
    </div>
  );

}

export default App;