import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GlobalStyled from './components/GlobalStyled';
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import RootLayout from './layout/Root-layout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import CategoryListPage from './pages/category/CategoryListPage';
import NowPlaying from './pages/category/NowPlaying';
import Popular from './pages/category/Popular';
import TopRated from './pages/category/TopRated';
import UpComing from './pages/category/UpComing';
import MovieDetailPage from './pages/MovieDetailPage';

const queryClient = new QueryClient();

// createBrowserRouter를 사용하여 라우터 생성
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'signup',
                element: <SignupPage />,
            },
            {
                path: 'search',
                element: <SearchPage />,
            },
            {
                path: 'category',
                element: <CategoryPage />,
                children: [
                    {
                        index: true,
                        element: <CategoryListPage />,
                    },
                    {
                        path: 'now-playing',
                        element: <NowPlaying />,
                    },
                    {
                        path: 'popular',
                        element: <Popular />,
                    },
                    {
                        path: 'top-rated',
                        element: <TopRated />,
                    },
                    {
                        path: 'up-coming',
                        element: <UpComing />,
                    }
                ],
            },
            {
                path: 'movie/:movieId',
                element: <MovieDetailPage />,
            },
        ],
    },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <GlobalStyled />
    </QueryClientProvider>
  );
}

export default App;
