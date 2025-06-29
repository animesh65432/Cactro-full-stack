import { postComment, deleteComment, replyToComment, getReplies, getVideoComments } from "../controllers/commentController"
import { Router } from "express"

const router = Router()

// Route to post a comment on a video
router.post("/:videoId", postComment)

router.get('/:videoId', getVideoComments);

// Route to reply to a comment
router.post("/reply/:parentId", replyToComment)

// Route to delete a comment
router.delete("/:commentId", deleteComment)

router.get("/replies/:parentId", getReplies)

export default router