import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// 특정 ID의 Todo 데이터를 가져오는 함수
const fetchTodo = async (id) => {
  // GET 요청
  const response = await axios.get(`http://localhost:3000/todo/${id}`);
  // console.log("API 응답 데이터:", response.data); // 데이터 콘솔 확인
  if (!response.data) {
    throw new Error("Todo를 찾을 수 없습니다.");
  }
  return response.data;
};

const TodoDetailPage = () => {
  const { id } = useParams(); // URL에서 id 추출

  // useMutation
  const { mutate: fetchTodoById, data: todo, isLoading, isError, error } = useMutation({
    mutationFn: () => fetchTodo(id),
  });

  // 컴포넌트 로드 시 데이터 가져오기
  useEffect(() => {
    // console.log("useParams로 가져온 id:", id); // id 값 확인
    fetchTodoById();
  }, [id, fetchTodoById]);

  // 로딩 중
  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  // 에러
  if (isError) {
    return <p>에러가 발생했습니다: {error.message}</p>;
  }

  // 데이터가 없는 경우
  if (!todo) {
    return <p>Todo를 찾을 수 없습니다.</p>;
  }

  // 날짜 형식을 포맷팅하는 함수
  const formatDate = (date) => {
    if (!date) return "날짜 정보 없음"; // 날짜가 없는 경우 기본 메시지 반환
    const parsedDate = new Date(date); // 날짜 문자열을 Date 객체로 변환
    if (isNaN(parsedDate)) return "올바르지 않은 날짜"; // 날짜 변환이 실패한 경우 처리
    const options = {
      year: "numeric", // 연도 표시 (숫자)
      month: "long", // 월 표시 (풀네임)
      day: "numeric", // 일 표시 (숫자)
      hour: "2-digit", // 시 표시 (2자리)
      minute: "2-digit", // 분 표시 (2자리)
      second: "2-digit", // 초 표시 (2자리)
    };
    return parsedDate.toLocaleDateString("ko-KR", options); // 한국어 날짜 형식으로 반환
  };

  return (
    <div>
      <h1>UMC ToDo List</h1>
      <h3><strong>ID :</strong> {todo.id}</h3>
      <p><strong>타이틀 :</strong> {todo.title}</p>
      <p><strong>내용 :</strong> {todo.content}</p>
      <p><strong>상태 :</strong> {todo.checked ? "완료" : "미완료"}</p>
      <p><strong>작성일 :</strong> {formatDate(todo.createdAt)}</p>
    </div>
  );
};

export default TodoDetailPage;
