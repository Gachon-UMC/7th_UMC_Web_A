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

const Todo = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [checked, setCheked] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [editingId, setEditingId] = useState();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // e.preventDefault();
        await createTodo({ title, content, checked });
    };

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

    // 삭제하기
    const deleteData = async (id) => {
        try {
            await deleteTodo({ id }); // 특정 Todo 삭제
            setTodoList((a) => a.filter((todo) => todo.id !== id)); // 삭제된 항목 제외
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
                <div key={data.id} onClick={() => navigate(`/${data.id}`)}>
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
                    {editingId === data.id ? (
                        <button
                            onClick={() => patchData(data.id, title, content)}
                        >
                            저장
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                patchDatam(data.id, data.title, data.content)
                            }
                        >
                            수정
                        </button>
                    )}

                    <button onClick={() => deleteData(data.id)}>
                        삭제하기
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Todo;
