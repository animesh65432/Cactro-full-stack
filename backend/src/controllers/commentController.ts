import axios from 'axios';
import { Request, Response } from 'express';
import { getAccessToken } from "../utils"
import EventLog from '../models/EventLog';


export const postComment = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        const { text } = req.body;
        const token = await getAccessToken();

        const response = await axios.post(
            'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet',
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

        await EventLog.create({ action: 'post_comment', videoId, details: response.data });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const replyToComment = async (req: Request, res: Response) => {
    try {
        const { parentId } = req.params;
        const { text } = req.body;
        const token = await getAccessToken();

        const response = await axios.post(
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

        await EventLog.create({ action: 'reply_comment', videoId: parentId, details: response.data });
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        const token = await getAccessToken();

        await axios.delete(`https://www.googleapis.com/youtube/v3/comments?id=${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        await EventLog.create({ action: 'delete_comment', videoId: commentId });
        res.json({ message: 'Comment deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
