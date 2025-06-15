import { getVideoDetails, updateVideoDetails, } from "../controllers/videoController"
import { Router } from "express"

const router = Router()

// Route to get video details
router.get("/:videoId", getVideoDetails)

// Route to update video details
router.put("/:videoId", updateVideoDetails)

export default router