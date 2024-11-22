import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ToDos from "./components/toDos";
import Errorpage from "./components/errorpage";
import GetTodoDetails from "./components/getTodoDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
export const queryClient = new QueryClient();
import { RecoilRoot } from "recoil";
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
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        </RecoilRoot>
    );
};

export default App;
