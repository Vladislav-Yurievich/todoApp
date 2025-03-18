import express from 'express'
import { postSignUp } from '../controllers/signup.js'

const router = express.Router()

router.post('/signup', postSignUp)

export default router
