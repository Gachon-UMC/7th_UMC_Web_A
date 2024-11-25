export interface MovieType {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type CategoryType = {
    name: "현재 상영중인" | "높은 평점" | "개봉 예정" | "인기 ";
    value: "now_playing" | "top_rated" | "upcoming" | "popular";
};
