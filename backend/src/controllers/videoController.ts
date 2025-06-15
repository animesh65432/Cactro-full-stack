import axios from 'axios';
import { Request, Response } from 'express';
import { getAccessToken } from "../utils"
import EventLog from '../models/EventLog';

export const getVideoDetails = async (req: Request, res: Response) => {
    try {
        const token = await getAccessToken();
        const videoId = req.params.videoId;

        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
                part: 'snippet,statistics',
                id: videoId,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        await EventLog.create({ action: 'fetch_video', videoId, details: response.data });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
export const getVideoComments = async (req: Request, res: Response) => {
    try {
        const token = await getAccessToken();
        const videoId = req.params.videoId;

        const response = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
            params: {
                part: 'snippet',
                videoId,
                maxResults: 50,
                textFormat: 'plainText',
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        await EventLog.create({ action: 'fetch_comments', videoId, details: response.data });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateVideoDetails = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        const { title, description } = req.body;
        const token = await getAccessToken();

        const response = await axios.put(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet`,
            {
                id: videoId,
                snippet: {
                    title,
                    description,
                    categoryId: '22', // People & Blogs
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        await EventLog.create({ action: 'update_video', videoId, details: req.body });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};


