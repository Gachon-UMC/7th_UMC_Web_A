import * as S from "./card-skeleton.style";

const CardSkeleton = () => {
  return (
    <S.MovieContainer>
      <S.Poster />
      <S.Title />
      <S.Date />
    </S.MovieContainer>
  );
};

export default CardSkeleton;
