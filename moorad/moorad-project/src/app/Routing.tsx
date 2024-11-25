import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import RootLayout from "./RootLayout";

const Error = () => {
    return <h1> Errorrr</h1>;
};
// path와 index 차이
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "signin",
                element: <SignIn />,
            },
        ],
    },
]);

const Routing = () => {
    return <RouterProvider router={router}></RouterProvider>;
};

export default Routing;
