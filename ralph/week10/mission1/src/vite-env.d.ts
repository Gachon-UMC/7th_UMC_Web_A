interface ImportMetaEnv {
    readonly VITE_MOVIE_API_URL: string;
    readonly VITE_TMDB_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
