import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<TodoPage />} /> {/* 기본경로페이지 */}
        <Route path="/todo/:id" element={<TodoDetailPage />} /> {/* /todo/:id 경로로 TodoDetailPage 렌더링 */}
      </Routes>
    </Router>
  );
}

export default App;
