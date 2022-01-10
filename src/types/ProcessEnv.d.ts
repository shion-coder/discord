declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN: string;
    SENDGRID_KEY: string;
    GUILD_ID: string;
    CLIENT_ID: string;
    MONGO_URI: string;
  }
}
