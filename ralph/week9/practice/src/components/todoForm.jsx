import React from "react";
import styled from "styled-components";
import { createTodo } from "./todoApi";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../redux2/title";
import { setSearch } from "../redux2/search";
import { setContent } from "../redux2/content";
const TodoForm = () => {
    // 한번만 선언해서 재활용 가능 ( 밑에서 확인 )
    const dispatch = useDispatch();

    //
    const handleSubmit = (e) => {
        e.stopPropagation();
    };
    const createTodos = async () => {
        if (!getTitle || !getContent) {
            alert("제목과 내용을 입력해주세요");
            return;
        }
        await createTodo({ title: getTitle, content: getContent });
    };

    // 상태 변화 시키기
    const handleSearch = (e) => {
        dispatch(setSearch(e.target.value));
    };
    const handleTitle = (e) => {
        dispatch(setTitle(e.target.value));
    };
    const handleContent = (e) => {
        dispatch(setContent(e.target.value));
    };

    // 변화된 상태값 가져오기
    const getSearch = useSelector((state) => state.search.value);
    const getTitle = useSelector((state) => state.title.value);
    const getContent = useSelector((state) => state.content.value);

    return (
        <FormStyle onSubmit={handleSubmit}>
            <SearchDiv>검색</SearchDiv>
            <InputStyleDiv>
                <InputStyle
                    value={getSearch}
                    placeholder="검색하시오."
                    onChange={handleSearch}
                />
                <InputStyle
                    placeholder="제목을 입력하시오."
                    onChange={handleTitle}
                />
                <InputStyle
                    placeholder="내용을 입력하시오."
                    onChange={handleContent}
                />
                <ButtonStyle
                    onClick={createTodos}
                    disabled={!getTitle || !getContent}
                >
                    todo 생성
                    {/* // 버튼 dusabled처리 완료 ToDo 생성 + 내용 없이 빈 공백만 들어가는 것을 막아줌 */}
                </ButtonStyle>
            </InputStyleDiv>
        </FormStyle>
    );
};

export default TodoForm;

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
`;

const SearchDiv = styled.div`
    display: flex;
    justify-content: center;
    font-size: 30px;
    margin: 20px;
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
    cursor: pointer;
`;
const ButtonStyle = styled.button`
    width: 40vw;
    border-radius: 10px;
    text-align: center;
    padding: 2px;
    background-color: skyblue;
    cursor: pointer;
`;
