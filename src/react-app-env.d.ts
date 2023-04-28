/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
       //types of envs
        NODE_ENV: 'development' | 'production' | 'test';
        REACT_APP_SUPABASE_URL_GTFC: string;
        REACT_APP_SUPABASE_KEY_GTFC: string;

    }
}