import React from 'react';
import { useLocation, useParams  } from 'react-router-dom';
import { axiosInstance } from '../apis/axios-instance';
import { useEffect } from 'react';
import { useState } from 'react';
import Credits from '../components/credits';

const MovieDetails = () => {
  const location = useLocation();
  const { movieId }= useParams();
  const [data,setData]=useState();
  useEffect(()=> {
    const abc = async () => {
      const def =await axiosInstance.get(`/movie/${movieId}/credits?language=ko`)
      setData(def.data.cast);
    }
    abc();
  },[])


  return (
    <div className="test">
      {data && data.map((movie) => (
     <Credits key={movie.id} movie={movie}/>
    
))}
      <img src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}/>
      <p>Release Date:{data?.title}</p>
    </div>
  )
}

export default MovieDetails;
