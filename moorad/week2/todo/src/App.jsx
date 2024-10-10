import { useRef, useState } from "react";
import "./App.css";

function App() {
    const inputRef = useRef();
    const editInputRef = useRef([]);
    const [completeCount, setCompleteCount] = useState(0);
    const [todos, setTodos] = useState([]);
    const editModeRef = useRef([]);

    const addTodo = (e) => {
        e.preventDefault();
        const newTodo = inputRef.current.value;

        setTodos((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
        editModeRef.current.push(false);
    };

    const modifyTodo = (idx) => {
        editModeRef.current[idx] = true;
        setTodos([...todos]);
    };

    const saveTodo = (idx) => {
        const newTodo = editInputRef.current[idx].value;
        todos[idx] = newTodo;
        editModeRef.current[idx] = false;
        setTodos([...todos]);
    };

    const removeTodo = (idx) => {
        setTodos((prev) => prev.filter((_, index) => index !== idx));
        editModeRef.current.splice(idx, 1);
    };

    const completeTodo = (idx) => {
        setCompleteCount((prev) => ++prev);
        removeTodo(idx);
    };

    return (
        <main className="flex flex-col items-center">
            <span className="mb-5">완료한 TODO : {completeCount}</span>
            <form
                id="todo"
                className="flex items-center justify-between w-[300px] h-[50px]"
            >
                <input
                    type="text"
                    className="h-full w-[70%] rounded-lg bg-white text-black px-4"
                    name="todoInput"
                    ref={inputRef}
                />
                <button
                    className="h-full bg-gray-500 text-black"
                    onClick={addTodo}
                    form="todo"
                >
                    추가
                </button>
            </form>

            <section className="mt-10 w-[500px]">
                {todos.length !== 0 &&
                    todos.map((todo, idx) => {
                        return (
                            <div
                                key={idx}
                                className="border mb-3 w-full h-[50px] flex items-center justify-between"
                            >
                                <div className="w-[50%] h-full flex justify-center items-center">
                                    {editModeRef.current[idx] ? (
                                        <input
                                            type="text"
                                            className="w-full h-[80%] bg-white rounded-lg text-black px-3 mx-2"
                                            defaultValue={todo}
                                            ref={(el) =>
                                                (editInputRef.current[idx] = el)
                                            }
                                        />
                                    ) : (
                                        todo
                                    )}
                                </div>
                                <div className="w-[50%] flex justify-between">
                                    {editModeRef.current[idx] ? (
                                        <button
                                            className="w-[30%]"
                                            onClick={() => saveTodo(idx)}
                                        >
                                            저장
                                        </button>
                                    ) : (
                                        <button
                                            className="w-[30%]"
                                            onClick={() => modifyTodo(idx)}
                                        >
                                            수정
                                        </button>
                                    )}
                                    <button
                                        className="w-[30%]"
                                        onClick={() => removeTodo(idx)}
                                    >
                                        삭제
                                    </button>
                                    <button
                                        className="w-[30%]"
                                        onClick={() => completeTodo(idx)}
                                    >
                                        완료
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </section>
        </main>
    );
}

export default App;
