import { createNote, getNotes } from "../controllers/noteController"
import { Router } from "express"

const router = Router()

router.post("/", createNote)
router.get("/", getNotes)


export default router