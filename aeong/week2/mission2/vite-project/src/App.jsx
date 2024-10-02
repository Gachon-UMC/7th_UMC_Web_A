import "./App.css";
import { MOVIES } from "./mocks/movies.js";

function App() {
  return (
    <>
      <div>
        {MOVIES.results.map((movie) => (
          <img
            style={{ margin: "10px", borderRadius: "10%" }}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            width="170px"
            onMouseOver={(e) => (e.target.style.filter = "grayscale(100%)")}
            onMouseLeave={(e) => (e.target.style.filter = "grayscale(0%)")}
          />
        ))}
      </div>
    </>
  );
}

export default App;
