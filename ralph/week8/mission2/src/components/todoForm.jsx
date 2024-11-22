import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { contentState, searchState } from "./atom";
import { titleState } from "./atom";
import { createTodo } from "./todoApi";
const TodoForm = () => {
    const [search, setSearch] = useRecoilState(searchState);
    const [title, setTitle] = useRecoilState(titleState);
    const [content, setContent] = useRecoilState(contentState);
    const handleSubmit = (e) => {
        e.stopPropagation();
    };
    const createTodos = async () => {
        await createTodo({ title, content });
    };

    return (
        <FormStyle onSubmit={handleSubmit}>
            <SearchDiv>검색</SearchDiv>
            <InputStyleDiv>
                <InputStyle
                    value={search}
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
                    disabled={
                        !(
                            title &&
                            content &&
                            title === null &&
                            content === null
                        )
                    }
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
