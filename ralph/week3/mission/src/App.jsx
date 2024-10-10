import Homepage from "./pages/home";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import NotFound from "./pages/not-found"
import Search from "./pages/search"
import Movie from "./pages/movie"
import { createBrowserRouter , RouterProvider} from "react-router-dom";
import RootLayout from "./layout/root-layout";
import Upcomming from "./pages/Upcomming";
import Toprated from "./pages/Toprated";
import Popular from "./pages/Popular";
import Nowplaying from "./pages/Nowplaying";
const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout />,
    errorElement:<NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path:'/login',
        element:<Login />
    },
    {
      path:'/signup',
      element:<Signup />
    },
    {
      path:'/search',
      element:<Search />
    },
    {
      path:'/movie',
      element:<Movie />
    },
    {
      path:'/upcomming',
      element:<Upcomming />
    },
    {
      path:'/popular',
      element:<Popular />
    },
    {
      path:'/nowplaying',
      element:<Nowplaying />
    },
    {
      path:'/toprated',
      element:<Toprated />
    }
  ]
}])

function App ()
{
  return (
<div>
  <div style={{marginLeft:"10px"}}>
    <RouterProvider router ={router} />
  </div> 
</div>
);
}
export default App;

