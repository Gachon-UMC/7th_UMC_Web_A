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
      // IMG_BASE_URL에는 이미지들의 공통 URL을 가져왔고 movie.poster_path에는 이미지의 개별 URL을 가져옴
      // Nowplaying, Popular, Upcomming , Toprated에서 각각 props로 가져온 movie객체(여기 안에는 영화 데이터가 리스트 형태로 저장되어 있음 )안에 있는 title, release_date 값을 가져옴
      // 영화 데이터 다운 받아 보면 각 영화 별로 title, poster_path,release_data가 다 있음 


      