import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
    getTodoList,
    createTodo,
    getTodoDetail,
    deleteTodo,
    patchTodo,
} from "./todoApi";
import { useNavigate } from "react-router-dom";
import React from "react";
// import DeleteTodo from "./deleteTodo";
const Todo = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [checked, setCheked] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [editingId, setEditingId] = useState();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    // const { deleteData, todolist } = DeleteTodo();

    const handleSubmit = async (e) => {
        // e.preventDefault();
        await createTodo({ title, content, checked });
    };

    //useQuery 쓰면 그냥 받아 올 수 있는데 ;;
    useEffect(() => {
        const getData = async () => {
            const data = await getTodoList({ title: search });
            setTodoList(data[0]);
            console.log(data);
        }; // Promise 해결

        getData();
    }, [search]);

    // 수정하기
    const patchDatam = (id, title, content) => {
        setContent(content);
        setTitle(title);
        setEditingId(id);
    };

    const patchData = async (id, title, content) => {
        try {
            await patchTodo({ id, title, content });

            setTodoList((todoList) =>
                todoList.map((todo) =>
                    todo.id === id ? { ...todo, title, content } : todo
                )
            );

            setEditingId(null);
        } catch (error) {
            console.error("수정 안됨", error);
        }
    };

    // 삭제하기;
    const deleteData = async (id) => {
        try {
            await deleteTodo({ id }); // 특정 Todo 삭제
            setTodoList((prev) => prev.filter((todo) => todo.id !== id)); // 여기 있는 prev는 기존에 todoList state 안에 들어 있는 배열이 자동으로 들어간다
            // setTodoList가 콜백 함수 형태로 호출될 때, React는 자동으로 현재 상태 (todoList) 값을 prev라는 매개변수에 전달합니다. 이 매개변수는 상태 업데이트를 계산할 때 사용할 수 있도록 React에서 관리
            // setTodoList 같은 setState를 호출할 때, 이전 상태를 기반으로 새로운 상태를 계산하려면 콜백 함수를 사용
            //(prev) => prev.filter((todo) => todo.id !== id) : 콜백 함수
        } catch (error) {
            console.error("Error deleting todo:", error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={search}
                    placeholder="검색어를 입력하세요"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div>
                    <input
                        placeholder="제목을 입력해주세요"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    ></input>
                    <input
                        placeholder="내용을 입력해주세요"
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    ></input>
                </div>

                <button type="submit">todo생성</button>
            </form>
            {todoList.map((data) => (
                <div key={data.id}>
                    <div onClick={() => navigate(`/${data.id}`)}>
                        {editingId === data.id ? (
                            <div>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input>
                                <input
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></input>
                            </div>
                        ) : (
                            <div>
                                <div>{data.title}</div>
                                <div>{data.content}</div>
                                <input type="checkbox"></input>
                            </div>
                        )}
                    </div>
                    <div>
                        {editingId === data.id ? (
                            <button
                                onClick={() =>
                                    patchData(data.id, title, content)
                                }
                            >
                                저장
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    patchDatam(
                                        data.id,
                                        data.title,
                                        data.content
                                    )
                                }
                            >
                                수정
                            </button>
                        )}

                        <button onClick={() => deleteData(data.id)}>
                            삭제하기
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Todo;
