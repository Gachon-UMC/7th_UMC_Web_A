// todo : 공식 문서 찾아보기
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import Movies from "./pages/Movies";
import RootLayout from "./layout/RootLayout";
import Search from "./pages/Search";
import { RecoilRoot } from "recoil";
import Category from "./pages/Category";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        // Q. 기본 경로에만 넣어주면 되나 ?
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Main /> },
            {
                path: "movies/:movieID",
                element: <Movies />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "category",
                element: <Category />,
            },
        ],
    },
]);

function App() {
    return (
        <RecoilRoot>
            <RouterProvider router={router}></RouterProvider>;
        </RecoilRoot>
    );
}

export default App;
