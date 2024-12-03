import CardSkeleton from "./card-skeleton";

interface CardListSkeletonProps {
  number: number; // 'number' prop의 타입 정의
}

const CardListSkeleton = ({ number }: CardListSkeletonProps) => {
  return (
    <>
      {new Array(number).fill(0).map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </>
  );
};

export default CardListSkeleton;
