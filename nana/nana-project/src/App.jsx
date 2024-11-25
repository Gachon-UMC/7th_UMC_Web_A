import React from 'react';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import GlobalStyled from './components/GlobalStyled.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. 만든 페이지들을 import
import HomePage from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import RootLayout from './layout/Root-layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import CategoryListPage from './pages/category/CategoryListPage.jsx';

import NowPlaying from './pages/category/NowPlaying.jsx';
import Popular from './pages/category/Popular.jsx';
import TopRated from './pages/category/TopRated.jsx';
import UpComing from './pages/category/UpComing.jsx';

import MovieDetailPage from './pages/MovieDetailPage.jsx';

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
          },
          {
            // 영화 카드 클릭 시 나타날 movie 페이지
            path: 'movie/:movieId',
            element: <MovieDetailPage />
          }
        ]
    },
    
])

const queryClient = new QueryClient();

// createBrowserRouter를 통해 만든 router를 RouterProvider의 router에 전달
// 글로벌스타일 페이지를 통해 body 스타일 기본 정의
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <GlobalStyled/>
      </QueryClientProvider>
    </>
  );
}

export default App;
