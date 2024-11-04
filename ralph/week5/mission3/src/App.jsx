import Homepage from "./pages/home";
import SignUpPage from "./pages/Signup";
import NotFound from "./pages/not-found";
import Search from "./pages/search";
import Movie from "./pages/movie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import Upcomming from "./pages/Upcomming";
import Toprated from "./pages/Toprated";
import Popular from "./pages/Popular";
import Nowplaying from "./pages/Nowplaying";
import LogInPage from "./pages/Login";
const router = createBrowserRouter([
    // router 객체 생성
    {
        //경로(path)와 해당 경로에 매칭되는 컴포넌트(element)를 설정
        path: "/", // "/" 경로일 때 RootLayout 컴포넌트를 렌더링
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true, // 부모 경로에서 기본적으로 렌더링할 컴포넌트를 정의하는 것
                element: <Homepage />, // 별도의 하위 경로가 없어도 지정된 컴포넌트가 자동으로 렌더링됩니다. 즉, 인덱스 페이지로 Homepage 컴포넌트를 렌더링
                // Homepage 컴포넌트가 부모 경로의 기본 페이지로 렌더링되도록 설정
            },
            {
                path: "/LogInPage", // "/login" 경로일 때 Login 컴포넌트를 렌더링
                element: <LogInPage />,
            },
            {
                path: "/SignUpPage", // "/signup" 경로일 때 Signup 컴포넌트를 렌더링
                element: <SignUpPage />,
            },
            {
                path: "/search", // "/search" 경로일 때 Search 컴포넌트를 렌더링
                element: <Search />,
            },
            {
                path: "/movie", // "/movie" 경로일 때 Movie 컴포넌트를 렌더링
                element: <Movie />,
            },
            {
                path: "/upcomming", // "/upcomming" 경로일 때 Upcomming 컴포넌트를 렌더링
                element: <Upcomming />,
            },
            {
                path: "/popular", // "/popular" 경로일 때 Popular컴포넌트를 렌더링
                element: <Popular />,
            },
            {
                path: "/nowplaying", // "/nowplaying" 경로일 때 Nowplaying 컴포넌트를 렌더링
                element: <Nowplaying />,
            },
            {
                path: "/toprated", // "/toprated" 경로일 때 Toprated 컴포넌트를 렌더링
                element: <Toprated />,
            },
        ],
    },
]);

function App() {
    return (
        <div>
            <div style={{ marginLeft: "10px" }}>
                <RouterProvider router={router} />
            </div>
        </div> //RouterProvider 컴포넌트는 라우터 객체를 받아서 앱에 라우팅을 활성화
        //이를 통해 사용자는 정의된 경로에 따라 해당하는 페이지로 네비게이션해서 경로에 맞는 컴포넌트를 렌더링.
    );
}
export default App;
