import React from "react";
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
import TodoForm from "./todoForm";
import { useDispatch, useSelector } from "react-redux";
import { setTitle, setTodoTitle } from "../redux2/title";

import { setContent, setTodoContent } from "../redux2/content";
import { setId, setTodoId } from "../redux2/id";
const ToDos = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getSearch = useSelector((state) => state.search.value);
    const getTitle = useSelector((state) => state.title.value);
    const getContent = useSelector((state) => state.content.value);
    const getId = useSelector((state) => state.id.value);

    const handleTitle = (e) => {
        dispatch(setTitle(e.target.value));
    };

    const handleContent = (e) => {
        dispatch(setContent(e.target.value));
    };

    // ToDo 가져오기
    const {
        data: todos,
        isError,
        isLoading,
        isPending,
    } = useQuery({
        queryKey: ["gettodo", getSearch],
        queryFn: () => getTodoList({ title: getSearch }),
    });

    // toDo 삭제하기
    // 이건 useMutation의 반환값을 구조분해할당으로 받은 것으로 이렇게 하거나
    // 아니면 이렇게 하나의 변수에 반환값을 다 받은 다음
    //const mutation = useMutation({블라블라}) 이런식으로 하고 호출할때 mutation.mutate 이렇게 해서 실행 시켜줘야함
    // 근데 그냥 구조분해할당으로 받아서
    // 145번째 줄 처럼 해도 되고 mutate라는 함수에 이름을 지정해줘도 된다.

    const { mutate } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gettodo"] });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    console.log(mutate);

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
        patchTodoMutation({
            id: todo.id,
            title: getTitle,
            content: getContent,
        });
    };

    const editTodo = (todo) => {
        console.log("수정");

        dispatch(setId(todo.id)),
            dispatch(setTitle(todo.title)),
            dispatch(setContent(todo.content));
    };

    return (
        <>
            <TodoForm />

            {isLoading ? (
                <Spinner />
            ) : (
                todos[0]?.map((todo) => {
                    return (
                        <TodoDiv key={todo.id}>
                            <TodoDivLeftSection>
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
                                    {getId === todo.id ? (
                                        <TodoDetail>
                                            <TodoDetailInput
                                                value={getTitle}
                                                onChange={handleTitle}
                                            ></TodoDetailInput>
                                            <TodoDetailInput
                                                value={getContent}
                                                onChange={handleContent}
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
                            </TodoDivLeftSection>

                            <TodoDivRightSection>
                                {getId === todo.id ? (
                                    <TodoButton onClick={() => saveTodo(todo)}>
                                        저장
                                    </TodoButton>
                                ) : (
                                    <TodoButton onClick={() => editTodo(todo)}>
                                        수정
                                    </TodoButton>
                                )}

                                <TodoButton
                                    onClick={
                                        () => mutate({ id: todo.id })
                                        // 이렇게 사용하는 것
                                        // 위에서 mutate를 구조분해할당으로 받음
                                        // deleteTodoMutation({ id: todo.id })
                                    }
                                >
                                    삭제
                                </TodoButton>
                            </TodoDivRightSection>
                        </TodoDiv>
                    );
                })
            )}
        </>
    );
};

export default ToDos;

// css
// 마우스 포인터 변경하는 css 도 적용 (cursor: pointer;)

const TodoDiv = styled.div`
    display: flex;
    width: 50vw;
    margin: auto;
    margin-top: 10px;
    border: 2px solid black;
    border-radius: 10px;
    background-color: lightblue;
`;

const TodoDivLeftSection = styled.div`
    display: flex;
    flex-basis: 100%;
`;
const TodoDivRightSection = styled.div`
    display: flex;
`;

const TodoButton = styled.button`
    border-radius: 10px;
    cursor: pointer;
`;

const TodoDetail = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    text-align: center; // 글자 중간으로 두기
    cursor: pointer;
    gap: 1px;
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
    cursor: pointer;
`;

const TodoDetailDiv2 = styled.div`
    display: flex;
`;
