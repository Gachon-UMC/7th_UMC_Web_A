export type Movie = {
    id: number;
    title: string;
    release_date: string | undefined;
    poster_path: string;
};

export type MovieDetail = {
    id: number;
    profile_path: string;
    name: string;
};
