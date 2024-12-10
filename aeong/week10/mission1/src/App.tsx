import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.js";
import NotFound from "./pages/NotFound.js";
import MoviesPage from "./pages/MoviesPage.js";
import LoginPage from "./pages/LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import SearchPage from "./pages/SearchPage.js";
import NowPlayingPage from "./pages/NowPlayingPage.js";
import PopularPage from "./pages/PopularPage.js";
import TopRatedPage from "./pages/TopRatedPage.js";
import UpComingPage from "./pages/UpComingPage.js";
import MovieDetailsPage from "./pages/MovieDetailsPage.js";

import RootLayout from "./layout/RootLayout.js";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    // Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
    children: [
      {
        // index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
        index: true,
        element: <HomePage />,
      },
      {
        // 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.s
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "movies/now-playing",
        element: <NowPlayingPage />,
      },

      {
        path: "movies/popular",
        element: <PopularPage />,
      },
      {
        path: "movies/top-rated",
        element: <TopRatedPage />,
      },
      {
        path: "movies/up-coming",
        element: <UpComingPage />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetailsPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
