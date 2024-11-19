import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ToDos from "./components/toDos";
import Errorpage from "./components/errorpage";
import GetTodoDetails from "./components/getTodoDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
export const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <ToDos />,
        errorElement: <Errorpage />,
    },
    {
        path: "/:todoId",
        element: <GetTodoDetails />,
        errorElement: <Errorpage />,
    },
]);
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>
                <ToDos />
            </RouterProvider>
        </QueryClientProvider>
    );
};

export default App;
