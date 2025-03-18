import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function postAddTodo(req, res) {
	const { title, description, dueDate, priority, status, assigneeId } = req.body
	const creatorId = req.user.id
	try {
		const newTodo = await prisma.todos.create({
			data: {
				title,
				description,
				dueDate,
				createdAt: new Date(),
				updatedAt: new Date(),
				priority,
				status,
				created_by: creatorId,
				user_id: parseInt(assigneeId, 10),
			},
		})
		res.json(newTodo)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка при добавлении задачи' })
	}
}

export async function getAllTodos(req, res) {
	const { userLogin } = req.params
	try {
		const user = await prisma.users.findUnique({
			where: { login: userLogin },
			select: { id: true },
		})
		if (!user) {
			return res.status(404).json({ error: 'Пользователь не найден' })
		}
		const todos = await prisma.todos.findMany({
			where: {
				OR: [{ created_by: user.id }, { user_id: user.id }],
			},
			include: {
				assignee: {
					select: {
						firstName: true,
						lastName: true,
					},
				},
			},
		})
		const formattedTodos = todos.map(todo => ({
			...todo,
			responsible: todo.assignee
				? `${todo.assignee.firstName} ${todo.assignee.lastName}`
				: 'Не назначен',
		}))
		res.json(formattedTodos)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка при получении задач' })
	}
}

export async function putEditTodo(req, res) {
	const { id } = req.params
	const { title, description, dueDate, priority, user_id, status } = req.body
	const userId = req.user.id // id текущего пользователя

	try {
		const user = await prisma.users.findUnique({
			where: { id: userId },
			include: { role: true },
		})

		if (!user) {
			return res.status(404).json({ error: 'Пользователь не найден' })
		}

		const todo = await prisma.todos.findUnique({
			where: { id: parseInt(id) },
		})

		if (!todo) {
			return res.status(404).json({ error: 'Задача не найдена' })
		}

		if (user.role.name !== 'MANAGER') {
			const updatedTodo = await prisma.todos.update({
				where: { id: parseInt(id) },
				data: {
					status,
				},
			})
			return res.json(updatedTodo)
		}

		// если пользователь является руководителем, разрешаю редачить все поля
		const updatedTodo = await prisma.todos.update({
			where: { id: parseInt(id) },
			data: {
				title,
				description,
				dueDate,
				priority,
				user_id: parseInt(user_id, 10),
				status,
			},
		})
		res.json(updatedTodo)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка при редактировании задачи' })
	}
}

export async function deleteTodo(req, res) {
	const { id } = req.params
	try {
		const deleteTodo = await prisma.todos.delete({
			where: { id: parseInt(id) },
		})
		res.json({ message: 'задача удалена', deleteTodo })
	} catch (err) {
		console.log(err)
		res.status(500).json({ error: 'Ошибка при удалении задачи' })
	}
}
