import React from 'react';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import GlobalStyle from './components/globalstyled';

// 1. 만든 페이지들을 import
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import RootLayout from './layout/root-layout.jsx';
import LoginPage from './pages/loginpage.jsx';
import SignupPage from './pages/signuppage.jsx';
import SearchPage from './pages/searchpage.jsx';
import CategoryPage from './pages/categorypage.jsx';
import CategoryListPage from './pages/category/categorylistpage.jsx';

import NowPlaying from './pages/category/nowplayingpage.jsx';
import Popular from './pages/category/popularpage.jsx';
import TopRated from './pages/category/topratedpage.jsx';
import UpComing from './pages/category/upcomingpage.jsx';

// 2. 연결
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound/>,
        children: [
          {
              // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
              index: true,
              element: <HomePage/>
          },
          {
            // 로그인 버튼 클릭 시 나타날 login 페이지
            path: 'login',
            element: <LoginPage/>
          },
          {
            // 회원가입 버튼 클릭 시 나타날 signup 페이지
            path: 'signup',
            element: <SignupPage/>
          },
          {
            // 찾기 클릭 시 나타날 search 페이지
            path: 'search',
            element: <SearchPage/>
          },
          {
            // 영화 클릭 시 나타날 category 페이지
            path: 'category',
            element: <CategoryPage/>,
            children: [
              {
                // 2. index: true는 위의 path: '/category' 즉, 카테고리 페이지 경로를 의미한다.
                index: true,
                element: <CategoryListPage/>
              },
              {
                  path: 'now-playing', // 카테고리 자식 페이지 (now-playing)
                  element: <NowPlaying />, // 선택된 카테고리 상세 정보 페이지
              },
              {
                  path: 'popular', // 카테고리 자식 페이지 (popular)
                  element: <Popular />, // 선택된 카테고리 상세 정보 페이지
              },
              {
                  path: 'top-rated', // 카테고리 자식 페이지 (top-rated)
                  element: <TopRated />, // 선택된 카테고리 상세 정보 페이지
              },
              {
                  path: 'up-coming', // 카테고리 자식 페이지 (up-coming)
                  element: <UpComing />, // 선택된 카테고리 상세 정보 페이지
              }
            ]
          }
        ]
    },
    
])

// createBrowserRouter를 통해 만든 router를 RouterProvider의 router에 전달
// 글로벌스타일 페이지를 통해 body 스타일 기본 정의
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyle/>
    </>
  );
}

export default App;
