import jwt from 'jsonwebtoken'

export async function authToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) return res.status(401).json({ error: 'Требуется авторизация' })

	jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
		if (err) return res.status(403).json({ error: 'Неверный токен' })
		req.user = user // Если токен верный, сохраняем данные пользователя
		next()
	})
}
