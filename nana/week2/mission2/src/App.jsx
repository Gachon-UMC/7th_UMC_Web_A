import React from 'react';
import { MOVIES } from './mocks/movies';

function App() {
  return (
    <div>
        {MOVIES.results.map(movie => (
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        ))}
    </div>
  );
}

export default App;
