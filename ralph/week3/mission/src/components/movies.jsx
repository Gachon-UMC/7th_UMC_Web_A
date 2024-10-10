import React from 'react'
// import "./movie.css"
const IMG_BASE_URL ="https://image.tmdb.org/t/p/w500/"

export default function Movies ({key,movie}){

  return (
   <div className='movie-container'>
    <div class='a'>
      <img src={IMG_BASE_URL + movie.poster_path}></img>
      </div>
      <div className='movie-info'>
         <h4>{movie.title}</h4>
         <span>{movie.release_date}</span>
       </div>
      </div> 
  );
}