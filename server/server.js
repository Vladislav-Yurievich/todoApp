import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import signupRoute from './routes/signup.js'
import loginRoute from './routes/login.js'
import { authToken } from './middleware/middleware.js'
import usersRoute from './routes/users.js'
import todosRoute from './routes/todos.js'

dotenv.config()
const PORT = 3000

const corsOptions = {
  origin: 'https://todo-app-client-8zbc.onrender.com',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
};

const app = express()

app.use(cors(corsOptions));
app.options('*', cors())
app.use(express.json())

app.post('/signup', signupRoute)

app.post('/login', loginRoute)

app.get('/users', authToken, usersRoute)

app.get('/user-role', authToken, usersRoute)

app.post('/todos', authToken, todosRoute)

app.get('/todos/:userLogin',  todosRoute)

app.put('/todos/:id', authToken, todosRoute)

app.delete('/todos/:id', authToken, todosRoute)

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}}`)
})
