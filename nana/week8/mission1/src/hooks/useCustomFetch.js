import { useState } from "react";

// useCustomFetch - API 요청 처리
export const useCustomFetch = (url, method = "GET") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // excute : params, body로 API 호출함
  const execute = async (params = null, body = null) => {
    setLoading(true); // 요청 시작 시 로딩 상태 true
    setError(null);// 요청 시작 시 에러 초기화

    try {
      const options = {
        method, // GET, POST, PATCH 등 설정된 method 사용
        headers: {
          "Content-Type": "application/json", // json 형식
        },
      };
      // body가 있을 경우, 요청 본문에 추가
      if (body) options.body = JSON.stringify(body);

      // FETCH 요청
      const response = await fetch(`http://localhost:3000${url}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 응답 데이터를 JSON 형태로 반환
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Todo 수정 PATCH 요청
  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {  // 서버 URL로 수정
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo), // 수정된 할 일(updatetodo) 데이터 본문에 포함
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      return response;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  return { execute, updateTodo, loading, error };
};
