import { Request, Response } from 'express';
import Note from '../models/Note';
import EventLog from '../models/EventLog';

export const createNote = async (req: Request, res: Response) => {
    try {
        const { videoId, content, tags } = req.body;
        const note = await Note.create({ videoId, content, tags });
        await EventLog.create({ action: 'create_note', videoId, details: note });
        res.status(201).json(note);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};