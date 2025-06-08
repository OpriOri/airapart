// src/env.d.ts
interface ImportMetaEnv {
    VITE_API_URL: string;
    VITE_USE_BACKEND: string;
    DEV: boolean;
    VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}