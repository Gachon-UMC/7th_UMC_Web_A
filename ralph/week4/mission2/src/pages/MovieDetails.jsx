import React from 'react';
import { useLocation, useParams  } from 'react-router-dom';
import { axiosInstance } from '../apis/axios-instance';
import { useEffect } from 'react';
import { useState } from 'react';

const MovieDetails = () => {
  const location = useLocation();
  const { movieId }= useParams();
  const [data,setData]=useState();
  useEffect(()=> {
    const abc = async () => {
      const def =await axiosInstance.get(`/movie/${movieId}?language=ko&page=1&region=KR`)
      setData(def.data);
    }
    abc();
  },[])
  return (
    <div className="test">
      <img src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}/>
      <p>Release Date:{data?.title}</p>
    </div>
  )
}

export default MovieDetails;
