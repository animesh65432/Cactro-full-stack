import { Router } from "express"
import commentRoutes from "./commentRoutes"
import videoRoutes from "./videoRoutes"
import noteRoutes from "./noteRoutes"

const router = Router()
// Mounting the comment routes
router.use("/comments", commentRoutes)

// Mounting the video routes
router.use("/videos", videoRoutes)

// Mounting the note routes
router.use("/notes", noteRoutes)

export default router
