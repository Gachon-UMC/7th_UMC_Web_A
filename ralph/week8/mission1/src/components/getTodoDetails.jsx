import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getTodoDetail } from "./todoApi";
const GetTodoDetails = () => {
    const { todoId } = useParams();
    const [todo, setTodo] = useState(null); // 초기값을 null로 설정
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    console.log("todoId from useParams:", todoId); // 디버깅용 로그
    useEffect(() => {
        const fetchTodo = async () => {
            try {
                console.log(todoId);

                const data = await getTodoDetail({ id: todoId }); // API 호출
                console.log(data);

                setTodo(data); // 첫 번째 데이터를 상태로 설정
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        if (todoId) {
            fetchTodo();
        }
    }, [todoId]); // todoId가 변경될 때마다 실행

    if (loading) {
        return <div>Loading...</div>; // 로딩 중 표시
    }

    if (!todo) {
        return <div>데이터를 찾을 수 없습니다.</div>; // 데이터 없을 때 표시
    }
    return (
        <div>
            <h1>{todo.title}</h1>
            <p>{todo.content}</p>
        </div>
    );
};

export default GetTodoDetails;
