declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    MONGO_URI: string;
    PASSWORD: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
  }
}
