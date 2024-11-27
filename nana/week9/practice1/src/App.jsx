import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';
import styles from'./App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <InputTodo />
      <TodoList />
    </div>
  );
}

export default App;