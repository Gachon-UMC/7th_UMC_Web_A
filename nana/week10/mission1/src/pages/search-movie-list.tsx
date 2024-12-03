import { useState } from "react";
import ImgCard from "../components/ImgCard";
import useCustomFetch from "../hooks/useCustomFetch";
import { useSearchParams } from "react-router-dom";
import CardListSkeleton from "../components/card-list-skeleton";
import Pagination from "../components/Pagination";  // Pagination 컴포넌트 임포트

// 영화 데이터 타입 정의
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;

}

// fetch 결과 타입 정의
interface FetchData {
    results: Movie[];
    total_pages: number;
}

// props 타입 정의
interface SearchMovieListProps {
    searchValue: string;
}

const SearchMovieList = ({ searchValue }: SearchMovieListProps) => {
    const [searchParams] = useSearchParams();
    const mq = searchParams.get('mq');
    const query = mq || searchValue;
    const [page, setPage] = useState<number>(1); // 페이지 상태 관리

    const url = `/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${page}`;
    
    // useCustomFetch 훅에서 반환된 타입을 FetchData로 정의
    const { data, isLoading, isError } = useCustomFetch<FetchData>(url);
    
    // 데이터를 movies로 설정 (data?.results 가 실제 영화 목록일 수 있음)
    const movies = data?.results || [];
    const totalPages = data?.total_pages || 1; // 전체 페이지 수

    const handleNextPage = () => { if (page < totalPages) setPage(prev => prev + 1); };
    const handlePrevPage = () => { if (page > 1) setPage(prev => prev - 1); };

    if (isError) {
        return <h1 style={{ color: 'white' }}>에러 발생</h1>;
    }

    if (isLoading) {
        return <CardListSkeleton number={20} />;
    }

    if (!query) {
        return <h1 style={{ color: 'white' }}>검색어를 입력해주세요!</h1>;
    }

    if (mq && movies.length === 0) {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'white' }}>해당하는 검색어 {mq}에</h1>
                <h1 style={{ color: 'white' }}>해당하는 데이터가 없습니다.</h1>
            </div>
        );
    }

    return (
        <>
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left' }}>
                    {movies.map((movie) => (
                        <ImgCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {/* 페이지네이션 추가 */}
                <Pagination 
                    page={page} 
                    totalPages={totalPages} 
                    onPrev={handlePrevPage} 
                    onNext={handleNextPage} 
                />
            </div>
        </>
    );
};

export default SearchMovieList;
