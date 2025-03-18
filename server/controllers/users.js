import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getAllUsers(req, res) {
	try {
		const users = await prisma.users.findMany({
			select: {
				id: true,
				firstName: true,
				lastName: true,
			},
		})
		res.json(users)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка получения пользователей' })
	}
}

export async function getUserRole(req, res) {
	const userId = req.user.id
	try {
		const user = await prisma.users.findUnique({
			where: { id: userId },
			include: { role: true },
		})

		if (!user) {
			return res.status(404).json({ error: 'Пользователь не найден' })
		}
		// Возвращаем роль пользователя
		res.json({ name: user.role.name })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка при получении роли пользователя' })
	}
}
