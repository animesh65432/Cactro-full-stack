import { useEffect, useState } from "react";
import api from "../../lib/api";
import type { Comment } from "../../types";
import styles from "./CommentSection.module.css";
import { toast } from "react-toastify";

interface EnhancedComment extends Comment {
    replies?: Comment[];
    replyCount?: number;
}

export const CommentSection = () => {
    const [comments, setComments] = useState<EnhancedComment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");
    const [isdeleting, setIsDeleting] = useState(false);
    const [isreplying, setIsReplying] = useState(false);
    const [isposting, setIsPosting] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [parentId, setparentId] = useState<string | null>(null);

    const fetchComments = async () => {
        setIsLoading(true)
        try {
            const res = await api.get("/videos/video/n51-fNHYWOU/comments");
            console.log(res.data, "fecth comments")
            const items = res.data.items;

            const parsedComments: EnhancedComment[] = items.map((item: any) => {
                const comment = item.snippet.topLevelComment.snippet;
                const replies: Comment[] = [];
                if (item.replies && item.replies.comments) {
                    item.replies.comments.forEach((replyItem: any) => {
                        const replySnippet = replyItem.snippet;
                        replies.push({
                            id: replyItem.id,
                            authorDisplayName: replySnippet.authorDisplayName,
                            authorProfileImageUrl: replySnippet.authorProfileImageUrl,
                            text: replySnippet.textDisplay,
                            publishedAt: replySnippet.publishedAt,
                        });
                    });
                }

                return {
                    id: item.id,
                    authorDisplayName: comment.authorDisplayName,
                    authorProfileImageUrl: comment.authorProfileImageUrl,
                    text: comment.textDisplay,
                    publishedAt: comment.publishedAt,
                    replies: replies,
                    replyCount: item.snippet.totalReplyCount || 0,
                };
            });

            setComments(parsedComments);
        } catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchComments()
    }, []);

    const postComment = async () => {
        setIsPosting(true)
        try {
            const res = await api.post("/comments/n51-fNHYWOU", { text: newComment });
            const item = res.data;
            const comment = item.snippet.topLevelComment.snippet;

            const newParsedComment: EnhancedComment = {
                id: item.id,
                authorDisplayName: comment.authorDisplayName,
                authorProfileImageUrl: comment.authorProfileImageUrl,
                text: comment.textDisplay,
                publishedAt: comment.publishedAt,
                replies: [],
                replyCount: 0,
            };

            setComments([...comments, newParsedComment]);
            setNewComment("");
            toast.success("Comment posted successfully!");
        } catch (error) {
        }
        finally {
            setIsPosting(false)
        }
    };

    const deleteComment = async (id: string) => {
        setIsDeleting(true)
        try {
            await api.delete(`/comments/${id}`);
            setComments(comments.filter((c) => c.id !== id));

            toast.success("Comment deleted successfully!");
        } catch (error) {
        }
        finally {
            setIsDeleting(false)
        }

    };

    const replyToComment = async (parentId: string) => {
        if (!replyText.trim()) {
            toast.error("Reply text cannot be empty.");
            return;
        }

        setIsReplying(true);
        try {
            await api.post(`/comments/reply/${parentId}`, { text: replyText });
            fetchComments();
            setReplyingTo(null);
            setReplyText("");
            toast.success("Reply posted successfully!");
        } catch (error) {
            console.error("Error posting reply:", error);
        }
        finally {
            setIsReplying(false)
        }
    };

    const handleReplyClick = (commentId: string) => {
        setReplyingTo(replyingTo === commentId ? null : commentId);
        setReplyText("");
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const fecthreplies = async (parentId: string) => {
        try {
            const res = await api.get(`/comments/replies/${parentId}`);
            const replies = res.data.items.map((item: any) => ({
                id: item.id,
                authorDisplayName: item.snippet.authorDisplayName,
                authorProfileImageUrl: item.snippet.authorProfileImageUrl,
                text: item.snippet.textDisplay,
                publishedAt: item.snippet.publishedAt,
            }));
            setComments(comments.map(c => c.id === parentId ? { ...c, replies } : c));
        } catch (error) {
            console.error("Error fetching replies:", error);
        }
    }

    useEffect(() => {
        if (parentId) {
            fecthreplies(parentId);
        }
    }, [parentId])

    const handlechange = (Id: string) => {
        if (parentId === Id) {
            console.log("same id")
            setparentId(null);
        } else {
            setparentId(Id);
        }
    }

    return (
        <div className={styles.section}>
            <h3>Comments</h3>
            <div className={styles.form}>
                <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button onClick={postComment}>
                    {isposting ? "loading" : "Post Comment"}
                </button>
            </div>

            {isloading ? (
                <div className={styles.loadingContainer}>
                    <p>Loading comments...</p>
                </div>
            ) : (
                <ul className={styles.list}>
                    {comments.map((c) => (
                        <li key={c.id} className={styles.commentItem} onClick={() => handlechange(c.id)} >
                            <div className={styles.commentHeader}>
                                <div className={styles.authorInfo}>
                                    <img
                                        src={c.authorProfileImageUrl}
                                        alt={c.authorDisplayName}
                                        className={styles.authorAvatar}
                                    />
                                    <div>
                                        <span className={styles.authorName}>{c.authorDisplayName}</span>
                                        <span className={styles.commentDate}>{formatDate(c.publishedAt)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.commentContent}>
                                <span>{c.text}</span>
                                <div className={styles.commentActions}>
                                    <button
                                        className={styles.replyButton}
                                        onClick={() => handleReplyClick(c.id)}
                                    >
                                        Reply
                                    </button>
                                    <button onClick={() => deleteComment(c.id)}>
                                        {isdeleting ? "loading" : "delete"}
                                    </button>
                                </div>
                            </div>


                            {parentId ? c.replies && c.replies.length > 0 && (
                                <div className={styles.repliesContainer}>
                                    <div className={styles.repliesHeader}>
                                        <span className={styles.repliesCount}>
                                            {c.replyCount} {c.replyCount === 1 ? 'reply' : 'replies'}
                                        </span>
                                    </div>
                                    <ul className={styles.repliesList}>
                                        {c.replies.map((reply) => (
                                            <li key={reply.id} className={styles.replyItem}>
                                                <div className={styles.replyHeader}>
                                                    <div className={styles.authorInfo}>
                                                        <img
                                                            src={reply.authorProfileImageUrl}
                                                            alt={reply.authorDisplayName}
                                                            className={styles.authorAvatar}
                                                        />
                                                        <div>
                                                            <span className={styles.authorName}>{reply.authorDisplayName}</span>
                                                            <span className={styles.commentDate}>{formatDate(reply.publishedAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.replyContent}>
                                                    <span>{reply.text}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}


                            {replyingTo === c.id && (
                                <div className={styles.replyForm}>
                                    <input
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write a reply..."
                                        className={styles.replyInput}
                                    />
                                    <div className={styles.replyActions}>
                                        <button
                                            className={styles.replySubmit}
                                            onClick={() => replyToComment(c.id)}
                                        >
                                            {isreplying ? "loading" : "Reply"}
                                        </button>
                                        <button
                                            className={styles.replyCancel}
                                            onClick={() => setReplyingTo(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};