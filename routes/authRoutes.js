import express from 'express'
import auth from '../controllers/auth.controller.js'
import authUser from '../middleware/authMiddleware.js'
const router = express.Router()


router.post("/signup" , auth.singupController)
router.post("/login" , auth.loginController)
router.get("/logout" , auth.logoutController)
router.get("/get-me" , authUser , auth.getMe)

export default router