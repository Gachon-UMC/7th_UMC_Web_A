import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
    createTodo,
    getTodoList,
    getTodoDetail,
    patchTodo,
    deleteTodo,
} from "./todoApi";
import { queryClient } from "../App";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
const ToDos = () => {
    const [id, setId] = useState();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, content);
        setTitle("");
        setContent(""); // 입력칸 초기화
    };

    // ToDo 생성하기
    const createTodos = async () => {
        await createTodo({ title, content });
    };

    // ToDo 가져오기
    const {
        data: todos,
        isError,
        isLoading,
        isPending,
    } = useQuery({
        queryKey: ["gettodo", search],
        queryFn: () => getTodoList({ title: search }),
    });

    // toDo 삭제하기
    const { mutate: deleteTodoMutation } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gettodo"] });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    // toDo 수정하기
    const { mutate: patchTodoMutation } = useMutation({
        mutationFn: patchTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gettodo"] });
            setId(null);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const saveTodo = (todo) => {
        patchTodoMutation({ id: todo.id, title: title, content: content });
    };
    const editTodo = (todo) => {
        setId(todo.id), setTitle(todo.title), setContent(todo.content);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>검색</h1>
                <input onChange={(e) => setSearch(e.target.value)} />
                <div>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></input>
                    <button onClick={createTodos}>ToDo 생성</button>
                </div>
            </form>

            {isLoading ? (
                <Spinner />
            ) : (
                todos[0]?.map((todo) => {
                    return (
                        <div key={todo.id} style={{ border: "solid 2px" }}>
                            {id === todo.id ? (
                                <div>
                                    <input
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    ></input>
                                    <input
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                    ></input>
                                </div>
                            ) : (
                                <div
                                    onClick={() => navigate(`${todo.id}`)}
                                    style={{ border: "solid 1px pink" }}
                                >
                                    <div>{todo.title}</div>
                                    <div>{todo.content}</div>
                                </div>
                            )}
                            {id === todo.id ? (
                                <button onClick={() => saveTodo(todo)}>
                                    저장
                                </button>
                            ) : (
                                <button onClick={() => editTodo(todo)}>
                                    수정
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    deleteTodoMutation({ id: todo.id })
                                }
                            >
                                삭제
                            </button>
                            <input
                                type="checkbox"
                                defaultChecked={todo.checked}
                                onChange={() =>
                                    patchTodoMutation({
                                        id: todo.id,
                                        checked: !todo.checked,
                                    })
                                }
                            ></input>
                        </div>
                    );
                })
            )}
        </>
    );
};

export default ToDos;
