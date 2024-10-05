import React from 'react'
import "./movie.css"
const IMG_BASE_URL ="https://image.tmdb.org/t/p/w500/"

export default function Movie ({title,poster_path,vote_average}){

  return (
   <div className='movie-container'>
    <div class='a'>
      <img src={IMG_BASE_URL + poster_path}></img>
      </div>
      <div className='movie-info'>
         <h4>{title}</h4>
         <span>{vote_average}</span>
       </div>
      </div> 
  );
}

