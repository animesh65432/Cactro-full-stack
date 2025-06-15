import * as dotenv from 'dotenv';
dotenv.config();


export const config = {
    YOUTUBE_URL: process.env.YOUTUBE_URL,
    YOUTUBE_ACCESS_TOKEN: process.env.YOUTUBE_ACCESS_TOKEN,
    YOUTUBE_REFRESH_TOKEN: process.env.YOUTUBE_REFRESH_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI as string
}
