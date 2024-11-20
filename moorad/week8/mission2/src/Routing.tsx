import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import TodoDetail from "./pages/TodoDetail";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { index: true, element: <App /> },
            {
                path: "todo/:id",
                element: <TodoDetail />,
            },
        ],
    },
]);
const Routing = () => {
    return <RouterProvider router={router}></RouterProvider>;
};

export default Routing;
