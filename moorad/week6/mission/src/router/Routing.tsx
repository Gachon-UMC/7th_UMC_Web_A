import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Category from "../pages/Category";
import Search from "../pages/Search";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import Movies from "../pages/Movies";
import MovieDetail from "../components/MovieDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Category />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "login",
                element: <LogIn />,
            },
            {
                path: "movies",
                element: <Movies />,
            },
            {
                path: "movies/:movieID",
                element: <MovieDetail />,
            },
        ],
    },
]);
const Routing = () => {
    return <RouterProvider router={router}></RouterProvider>;
};

export default Routing;
