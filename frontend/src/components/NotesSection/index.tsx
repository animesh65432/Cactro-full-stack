import { useEffect, useState } from "react";
import api from "../../lib/api";
import type { Note } from "../../types";
import styles from "./NotesSection.module.css";
import { toast } from "react-toastify";

export const NotesSection = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [query, setQuery] = useState("");
    const [noteInput, setNoteInput] = useState("");

    useEffect(() => {
        api.get("/notes").then((res) => setNotes(res.data));
    }, []);

    const addNote = async () => {
        if (!noteInput.trim()) {
            toast.error("Note content cannot be empty.");
            return
        }
        const res = await api.post("/notes", { content: noteInput });
        setNotes([...notes, res.data]);
        setNoteInput("");
    };

    const filtered = notes.filter(
        (n) => n.content.includes(query) || n.tags.some((t) => t.includes(query))
    );

    console.log(notes)

    return (
        <div className={styles.notesContainer}>
            <h3>Notes</h3>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes..."
                className={styles.input}
            />
            <div className={styles.noteForm}>
                <input
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="New note..."
                />
                <button onClick={addNote}>Add</button>
            </div>
            <ul className={styles.noteList}>
                {filtered.map((n) => (
                    <li key={n.id}>{n.content}</li>
                ))}
            </ul>
        </div>
    );
};
