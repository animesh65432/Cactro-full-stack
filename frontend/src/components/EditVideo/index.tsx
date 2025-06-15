import { useState } from "react";
import api from "../../lib/api";
import styles from "./EditVideo.module.css";

export const EditVideo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const updateVideo = async () => {
        await api.put("/videos/n51-fNHYWOU", { title, description });
        alert("Video updated!");
    };

    return (
        <div className={styles.editContainer}>
            <h3>Edit Video Info</h3>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New Title"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="New Description"
            />
            <button onClick={updateVideo}>Save</button>
        </div>
    );
};
