import "./App.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ToDoDetailPage from "./pages/ToDoDetailPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/todo/:id",
    element: <ToDoDetailPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
