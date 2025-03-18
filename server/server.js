import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import signupRoute from './routes/signup.js'
import loginRoute from './routes/login.js'
import { authToken } from './middleware/middleware.js'
import usersRoute from './routes/users.js'
import todosRoute from './routes/todos.js'

dotenv.config()

const app = express()
const PORT = 3000

app.use(
	cors({
		origin: 'https://todo-app-client-8zbc.onrender.com',
	})
)
app.post('/signup', signupRoute)

app.post('/login', loginRoute)

app.get('/users', authToken, usersRoute)

app.get('/user-role', authToken, usersRoute)

app.post('/todos', authToken, todosRoute)

app.get('/todos/:userLogin', todosRoute)

app.put('/todos/:id', authToken, todosRoute)

app.delete('/todos/:id', authToken, todosRoute)

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}}`)
})
