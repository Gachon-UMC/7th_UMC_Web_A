import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // URL 파라미터를 받기 위해
import { useCustomFetch } from "../hooks/useCustomFetch";

const TodoDetailPage = () => {
  const { id } = useParams(); // URL에서 id 추출
  const [todo, setTodo] = useState(null);
  const { execute: fetchTodo, loading, error } = useCustomFetch(`/todo/${id}`);

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const data = await fetchTodo();
        setTodo(data); // 데이터를 받아서 todo 상태에 설정
      } catch (error) {
        console.error("Todo 상세조회 실패:", error);
      }
    };
    loadTodo();
  }, [id]); // id가 변경될 때마다 새로 데이터를 불러옴

  // 로딩 중일 때
  if (loading) {
    return <p>로딩 중...</p>;
  }

  // 에러가 있을 때
  if (error) {
    return <p>에러가 발생했습니다: {error.message}</p>;
  }

  // 데이터가 없으면 로딩 중 메시지
  if (!todo) {
    return <p>Todo를 찾을 수 없습니다.</p>;
  }

  // 날짜 형식 포맷팅
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Date(date).toLocaleDateString("ko-KR", options);
  };

  return (
    <div>
      <h1>UMC ToDo List</h1>
      <h3><strong>ID :</strong> {todo.id}</h3>
      <p><strong>타이틀 :</strong> {todo.title}</p>
      <p><strong>내용 :</strong> {todo.content}</p>
      <p><strong>상태 :</strong> {todo.checked ? "완료" : "미완료"}</p>
      <p><strong>버전 :</strong> {todo.version}</p>
      <p><strong>작성일 :</strong> {formatDate(todo.createdAt)}</p>
    </div>
  );
};

export default TodoDetailPage;
