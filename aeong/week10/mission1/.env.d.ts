/// <reference types="vite/client" />

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_TMDB_TOKEN: string;
  readonly VITE_MOVIE_API_URL: string;
}
