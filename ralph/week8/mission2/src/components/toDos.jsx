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
import styled from "styled-components";
const ToDos = () => {
    const [id, setId] = useState();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [search, setSearch] = useState("");
    const [buttonDisable, setButtonDisable] = useState(true);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.stopPropagation();
        setTitle("");
        setContent(""); // 입력칸 초기화
    };

    // ToDo 생성하기
    const createTodos = async () => {
        const a = await createTodo({ title, content });
        console.log(a);

        if (a) return setButtonDisable(false);
        else return setButtonDisable(true);
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
    // 이건 useMutation의 반환값을 구조분해할당으로 받은 것으로 이렇게 하거나
    // 아니면 이렇게 하나의 변수에 반환값을 다 받은 다음
    //const mutation = useMutation({블라블라}) 이런식으로 하고 호출할때 mutation.mutate 이렇게 해서 실행 시켜줘야함

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
            <FormStyle onSubmit={handleSubmit}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "30px",
                        margin: "20px",
                    }}
                >
                    검색
                </div>
                <InputStyleDiv>
                    <InputStyle
                        placeholder="검색하시오."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <InputStyle
                        placeholder="제목을 입력하시오."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InputStyle
                        placeholder="내용을 입력하시오."
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <ButtonStyle
                        onClick={createTodos}
                        disabled={!(title && content)}
                    >
                        todo 생성
                        {/* // 버튼 dusabled처리 완료 ToDo 생성 */}
                    </ButtonStyle>
                </InputStyleDiv>
            </FormStyle>

            {isLoading ? (
                <Spinner />
            ) : (
                todos[0]?.map((todo) => {
                    return (
                        <TodoDiv key={todo.id}>
                            <div
                                style={{
                                    display: "flex",
                                    flexBasis: "100%",
                                }}
                            >
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
                                <TodoDetailDiv>
                                    {id === todo.id ? (
                                        <TodoDetail>
                                            <TodoDetailInput
                                                value={title}
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                            ></TodoDetailInput>
                                            <TodoDetailInput
                                                value={content}
                                                onChange={(e) =>
                                                    setContent(e.target.value)
                                                }
                                            ></TodoDetailInput>
                                        </TodoDetail>
                                    ) : (
                                        <TodoDetail
                                            onClick={() =>
                                                navigate(`${todo.id}`)
                                            }
                                        >
                                            <div>{todo.title}</div>
                                            <div>{todo.content}</div>
                                        </TodoDetail>
                                    )}
                                </TodoDetailDiv>
                            </div>

                            <div style={{ display: "flex" }}>
                                {id === todo.id ? (
                                    <TodoButton onClick={() => saveTodo(todo)}>
                                        저장
                                    </TodoButton>
                                ) : (
                                    <TodoButton onClick={() => editTodo(todo)}>
                                        수정
                                    </TodoButton>
                                )}

                                <TodoButton
                                    onClick={() =>
                                        deleteTodoMutation({ id: todo.id })
                                    }
                                >
                                    삭제
                                </TodoButton>
                            </div>
                        </TodoDiv>
                    );
                })
            )}
        </>
    );
};

export default ToDos;

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
`;
const InputStyleDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1vh;
    height: auto;
    align-items: center;
    justify-content: center;
`;
const InputStyle = styled.input`
    width: 40vw;
    border-radius: 10px;
    text-align: center;
    justify-content: center;
`;
const ButtonStyle = styled.button`
    width: 40vw;
    border-radius: 10px;
    text-align: center;
    padding: 2px;
    background-color: skyblue;
`;

const TodoDiv = styled.div`
    display: flex;
    width: 50vw;
    margin: auto;
    margin-top: 10px;
    border: 2px solid black;
    border-radius: 10px;
    background-color: lightblue;
`;

const TodoButton = styled.button`
    border-radius: 10px;
`;

const TodoDetail = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    text-align: center; // 글자 중간으로 두기
`;

const TodoDetailDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    // flex-direction을 기준으로 가로선 상 정렬인이기 때문에 dierction이 column이므로 center 하면 세로축을 x 축이라고 생각하고 우리가 생각하는 세로의 중간으로 오게 된다.
    // column 이면 y 축이 기준축이니까 고개를 돌려서 보면 그때의 가로축은  flex-direction이 row일 때의 세로와 같이 때문에 우리가 보면 세로축의 가운데로 가고 싶으면 row 이면 align-items를 center 하면 됐겠지만 column 이므로 justify-content 를 center로 해야 우리가 원하는 세로축 가운데로 가게 된다.

    flex-grow: 1; // 남은 공간을 div 태그가 꽉 채우기
    align-items: center;
`;

const TodoDetailInput = styled.input`
    background-color: #e0ffff;
    text-align: center;
    border-radius: 5px;
    gap: 1px;
`;

const TodoDetailDiv2 = styled.div`
    display: flex;
`;
