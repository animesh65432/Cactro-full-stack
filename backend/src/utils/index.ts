import axios from 'axios';
import { config } from "../config/index"

export const getAccessToken = async () => {

    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN } = config;

    const response = await axios.post('https://oauth2.googleapis.com/token', null, {
        params: {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            refresh_token: YOUTUBE_REFRESH_TOKEN,
            grant_type: 'refresh_token',
        },
    });

    console.log("✅ Access Token:", response.data.access_token);
    return response.data.access_token;

};

export const commentOnVideo = async (videoId: string, text: string) => {
    const token = await getAccessToken();
    if (!token) return;


    const res = await axios.post(
        "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet",
        {
            snippet: {
                videoId,
                topLevelComment: {
                    snippet: {
                        textOriginal: text,
                    },
                },
            },
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    console.log("✅ Comment posted:", res.data);

};


export const replyToComment = async (parentId: string, text: string) => {
    const token = await getAccessToken();

    const res = await axios.post(
        'https://www.googleapis.com/youtube/v3/comments?part=snippet',
        {
            snippet: {
                parentId,
                textOriginal: text,
            },
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return res.data;
};


export const updateVideoDetails = async (
    videoId: string,
    newTitle: string,
    newDescription: string
) => {
    const token = await getAccessToken();

    const res = await axios.put(
        'https://www.googleapis.com/youtube/v3/videos?part=snippet',
        {
            id: videoId,
            snippet: {
                title: newTitle,
                description: newDescription,
                categoryId: '22', // Required
            },
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return res.data;
};


export const deleteComment = async (commentId: string) => {
    const token = await getAccessToken();

    const res = await axios.delete(
        `https://www.googleapis.com/youtube/v3/comments?id=${commentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.status === 204;
};

