declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN: string;
    GUILD_ID: string;
    CLIENT_ID: string;
    MONGO_URI: string;
  }
}
