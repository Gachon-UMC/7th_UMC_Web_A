import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Movie 타입 정의
interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

// ImgCard 컴포넌트 Props 타입 정의
interface ImgCardProps {
  movie: Movie;
}

const ImgCard = ({ movie }: ImgCardProps) => {
  const { id, poster_path, title, release_date } = movie;
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = () => {
    navigate(`/movie/${id}`); // 클릭 시 영화 상세 페이지로 이동
  };

  return (
    <StyledImgCarddiv onClick={handleClick} style={{ cursor: "pointer" }}>
      <StyledImgCard 
        src={`https://image.tmdb.org/t/p/w500${poster_path}`} 
        alt={title} 
      />
      <ImgCardTitleText>{title}</ImgCardTitleText>
      <ImgCardRleaseText>{release_date}</ImgCardRleaseText>
    </StyledImgCarddiv>
  );
};

export default ImgCard;

// CSS
const StyledImgCarddiv = styled.div`
  width: 140px;
  margin-bottom: 20px;
  margin-left: 15px;
`;

const StyledImgCard = styled.img`
  width: 140px;
  margin: 5px;
  border-radius: 15px;

  &:hover {
    width: 140px;
    margin: 5px;
    border-radius: 15px;
    filter: brightness(30%);
  }
`;

const ImgCardTitleText = styled.h6`
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 5px;
  color: white;
  font-size: 15px;
`;

const ImgCardRleaseText = styled.h6`
  margin-top: 0;
  margin-bottom: 5px;
  margin-left: 5px;
  color: white;
  font-size: 10px;
`;
