import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // react-router-dom 추가
import TodoPage from "./pages/TodoPage";
import TodoDetailPage from "./pages/TodoDetailPage"; // TodoDetailPage 추가
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<TodoPage />} /> {/* TodoPage는 기본 경로로 */}
        <Route path="/todo/:id" element={<TodoDetailPage />} /> {/* /todo/:id 경로로 TodoDetailPage 렌더링 */}
      </Routes>
    </Router>
  );
}

export default App;
