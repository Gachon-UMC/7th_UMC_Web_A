import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import MoviesPage from "./pages/movies.jsx";
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";
import SearchPage from "./pages/search.jsx";
import NowPlayingPage from "./pages/now-playing.jsx";
import PopularPage from "./pages/popular.jsx";
import TopRatedPage from "./pages/top-rated.jsx";
import UpComingPage from "./pages/up-coming.jsx";
import MovieDetailsPage from "./pages/MoviesDetails.jsx";

import RootLayout from "./layout/root-layout.jsx";

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
