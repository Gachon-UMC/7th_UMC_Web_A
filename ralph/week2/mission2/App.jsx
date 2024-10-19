// import { useState } from "react";
import {dummy} from '../moviedummy';
import Movie from './components/Movie';

import "./App.css";
import "./index.css";
function App() {

    return (
      <div>
        <div className='app-container'>
          {dummy.results.map((item) => {
            return (
              <Movie 
                title={item.title}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
              />
            )
          })}
        </div>
      </div>
    );
}

export default App;