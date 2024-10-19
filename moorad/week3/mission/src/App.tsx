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
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        // Q. 기본 경로에만 넣어주면 되나 ?
        // A. 기본 경로에만 넣어주면 상위 경로 하위에 속한 모든 경로에서 발생하는 에러가 NotFound 컴포넌트로 처리됨
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Main /> },
            {
                path: "movies",
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
            {
                path: "signin",
                element: <SignIn />,
            },
            {
                path: "signup",
                element: <SignUp />,
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
