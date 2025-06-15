import { useState } from "react";
import api from "../../lib/api";
import styles from "./EditVideo.module.css";
import { toast } from "react-toastify";

export const EditVideo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isloading, setIsLoading] = useState(false);

    const updateVideo = async () => {
        setIsLoading(true)
        try {
            if (!title || !description) {
                toast.error("Please fill in both title and description.");
                return;
            }
            await api.put("/videos/n51-fNHYWOU", { title, description });
            toast.success("Video updated!");
        } catch (error) {
            toast.error("Error updating video. Please try again.");
        }
        finally {
            setIsLoading(false)
        }

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
            <button onClick={updateVideo}>{isloading ? "loading" : "Save"}</button>
        </div>
    );
};
