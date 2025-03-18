import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

export async function postSignUp(req, res) {
	const { firstName, lastName, middleName, login, password } = req.body
	const salt = bcrypt.genSaltSync(10)
	const hashedPassword = bcrypt.hashSync(password, salt)
	try {
		const userRole = await prisma.user_roles.findFirst({
			where: { name: 'USER' },
		})
		const newUser = await prisma.users.create({
			data: {
				firstName,
				lastName,
				middleName,
				login,
				hashed_password: hashedPassword,
				role_id: userRole.id,
			},
			select: { id: true, login: true },
		})
		const token = jwt.sign({ id: newUser.id, login }, process.env.SECRET_KEY, {
			expiresIn: '1h',
		})
		res.json({ login: newUser.login, token })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: err.detail || 'Ошибка регистрации' })
	}
}
