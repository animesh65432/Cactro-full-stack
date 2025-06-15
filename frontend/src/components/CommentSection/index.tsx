import { useEffect, useState } from "react";
import api from "../../lib/api";
import type { Comment } from "../../types";
import styles from "./CommentSection.module.css";

export const CommentSection = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");


    const fetchComments = async () => {
        try {
            const res = await api.get("/videos/video/n51-fNHYWOU/comments");
            const items = res.data.items;

            const parsedComments: Comment[] = items.map((item: any) => {
                const comment = item.snippet.topLevelComment.snippet;
                return {
                    id: item.id,
                    authorDisplayName: comment.authorDisplayName,
                    authorProfileImageUrl: comment.authorProfileImageUrl,
                    text: comment.textDisplay,
                    publishedAt: comment.publishedAt,
                };
            });

            setComments(parsedComments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    useEffect(() => {
        fetchComments()
    }, []);

    const postComment = async () => {
        const res = await api.post("/comments/n51-fNHYWOU", { text: newComment });
        setComments([...comments, res.data]);
        setNewComment("");
    };

    const deleteComment = async (id: string) => {
        await api.delete(`/video/comments/${id}`);
        setComments(comments.filter((c) => c.id !== id));
    };

    return (
        <div className={styles.section}>
            <h3>Comments</h3>
            <div className={styles.form}>
                <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button onClick={postComment}>Post</button>
            </div>
            <ul className={styles.list}>
                {comments.map((c) => (
                    <li key={c.id} className={styles.commentItem}>
                        <span>{c.text}</span>
                        <button onClick={() => deleteComment(c.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
