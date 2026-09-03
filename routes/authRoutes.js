import express from 'express'
import auth from '../controllers/auth.controller.js'
const router = express.Router()


router.post("/signup" , auth.singupController)
router.post("/login" , auth.loginController)
router.get("/logout" , auth.logoutController)

export default router