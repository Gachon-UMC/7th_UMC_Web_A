import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Todo from "./components/toDos";
import Errorpage from "./components/errorpage";
import GetTodoDetails from "./components/getTodoDetails";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Todo />,
        errorElement: <Errorpage />,
    },
    {
        path: "/:todoId",
        element: <GetTodoDetails />,
        errorElement: <Errorpage />,
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
