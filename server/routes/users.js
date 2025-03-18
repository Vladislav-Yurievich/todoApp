import express from 'express'
import { getAllUsers, getUserRole } from '../controllers/users.js'

const router = express.Router()

router.get('/users', getAllUsers)

router.get('/user-role', getUserRole)

export default router
