import styled from 'styled-components';

interface PaginationProps {
  page: number; // 현재 페이지
  totalPages: number; // 전체 페이지 수
  onPrev: () => void; // 이전 버튼 클릭 핸들러
  onNext: () => void; // 다음 버튼 클릭 핸들러
}

const Pagination = ({ page, totalPages, onPrev, onNext }: PaginationProps) => {
  return (
    <PaginationContainer>
      <PaginationButton onClick={onPrev} disabled={page === 1}>
        이전
      </PaginationButton>
      <PageNumber>{page} 페이지</PageNumber>
      <PaginationButton onClick={onNext} disabled={page === totalPages}>
        다음
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;

// CSS
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10rem;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  margin: 0 8px;
  background-color: #f82f62;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
`;
