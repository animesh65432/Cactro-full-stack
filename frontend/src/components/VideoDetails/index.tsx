import { useEffect, useState } from "react";
import api from "../../lib/api";
import styles from "./VideoDetails.module.css";
import type { Video } from "../../types";

export const VideoDetails = () => {
    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await api.get("/videos/n51-fNHYWOU");
                const videoData = res.data.items[0];
                setVideo(videoData);
            } catch (error) {
                console.log("Error fetching video details:", error);
            }
        };

        fetchVideo();
    }, []);

    if (!video) return <div>Loading video...</div>;

    const { snippet, statistics } = video;
    const thumbnail =
        snippet.thumbnails.maxres?.url ||
        snippet.thumbnails.high?.url ||
        snippet.thumbnails.medium?.url;

    return (
        <div className={styles.card}>
            <iframe
                className={styles.videoPlayer}
                src={`https://www.youtube.com/embed/${video.id}`}
                title={snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

            <h2 className={styles.title}>{snippet.title}</h2>
            <p>{snippet.description}</p>
            <p className={styles.meta}>
                Uploaded by <strong>{snippet.channelTitle}</strong> on{" "}
                {new Date(snippet.publishedAt).toLocaleDateString()}
            </p>
            <div className={styles.stats}>
                <span>👁️ {statistics.viewCount}</span>
                <span>👍 {statistics.likeCount}</span>
                <span>💬 {statistics.commentCount}</span>
            </div>
        </div>

    );
};
