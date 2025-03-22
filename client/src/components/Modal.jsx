import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { X } from 'lucide-react'
import useFetchUsers from '../hooks/useFetchUsers'
import useFetchUserRole from '../hooks/useFetchUserRole'
import { postData, editData } from '../api/todoApi'

const Modal = ({ mode, setShowModal, getData, task }) => {
	const [cookies] = useCookies(['AuthToken'])
	const editMode = mode === 'edit' ? true : false

	const [data, setData] = useState({
		title: editMode ? task.title : '',
		description: editMode ? task.description : '',
		dueDate: editMode ? task.dueDate : '',
		createdAt: editMode ? task.createdAt : new Date(),
		updatedAt: editMode ? task.updatedAt : new Date(),
		priority: editMode ? task.priority : '',
		status: editMode ? task.status : '',
		assignee: editMode ? task.user_id : '',
	})

	const users = useFetchUsers()
	const userRole = useFetchUserRole()

	const handleSubmit = async e => {
		e.preventDefault()
		if (editMode) {
			await editData(data, task, cookies, setShowModal, getData)
		} else {
			await postData(data, cookies, setShowModal, getData)
		}
	}

	const handleChange = e => {
		const { name, value } = e.target

		setData(data => ({
			...data,
			[name]: value,
		}))
	}

	return (
		<div
			id='crud-modal'
			tabIndex='-1'
			className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50'
		>
			<div className='relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700'>
				<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
						{editMode ? 'Редактирование задачи' : 'Добавление задачи'}
					</h3>
					<button
						onClick={() => setShowModal(false)}
						type='button'
						className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
					>
						<X />
						<span className='sr-only'>Close modal</span>
					</button>
				</div>

				<form className='p-4 md:p-5' onSubmit={handleSubmit}>
					<div className='grid gap-4 mb-4 grid-cols-2'>
						{userRole === 'MANAGER' && (
							<>
								<div className='col-span-2'>
									<label
										htmlFor='name'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Имя задачи
									</label>
									<input
										name='title'
										value={data.title}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
										placeholder='Введите имя задачи'
										id='name'
										required
										onChange={handleChange}
									/>
								</div>

								<div className='col-span-2'>
									<label
										htmlFor='description'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Описание задачи
									</label>
									<textarea
										name='description'
										value={data.description}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
										placeholder='Введите описание задачи'
										id='description'
										rows='2'
										required
										onChange={handleChange}
									></textarea>
								</div>

								<div className='col-span-2'>
									<label
										htmlFor='dueDate'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Срок выполнения
									</label>
									<input
										type='date'
										name='dueDate'
										value={data.dueDate}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
										id='dueDate'
										required
										onChange={handleChange}
									/>
								</div>

								<div className='col-span-2'>
									<label
										htmlFor='priority'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Приоритет задачи
									</label>
									<select
										name='priority'
										value={data.priority}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
										placeholder='Введите приоритет задачи'
										id='priority'
										required
										onChange={handleChange}
									>
										<option value='' disabled>
											Выберите приоритет
										</option>
										<option value='LOW'>Низкий</option>
										<option value='MEDIUM'>Средний</option>
										<option value='HIGH'>Высокий</option>
									</select>
								</div>

								<div className='col-span-2'>
									<label
										htmlFor='assignee'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Ответственный
									</label>

									<select
										name='assignee'
										value={data.assignee}
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
										placeholder='Выберите ответственного'
										id='assignee'
										required
										onChange={handleChange}
									>
										<option value='' disabled>
											Выберите ответственного
										</option>
										{users.map(user => (
											<option key={user.id} value={user.id}>
												{user.firstName} {user.lastName}
											</option>
										))}
									</select>
								</div>
							</>
						)}
						<div className='col-span-2'>
							<label
								htmlFor='status'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Статус задачи
							</label>
							<select
								name='status'
								value={data.status}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Введите статус задачи'
								id='status'
								required
								onChange={handleChange}
							>
								<option value='' disabled>
									Выберите статус задачи
								</option>
								<option value='TODO'>К выполнению</option>
								<option value='IN_PROGRESS'>Выполняется</option>
								<option value='DONE'>Выполнена</option>
								<option value='CANCELED'>Отменена</option>
							</select>
						</div>
					</div>
					<button
						className='rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-400 focus:shadow-none active:bg-blue-400 hover:bg-blue-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
						type='submit'
					>
						{editMode ? 'Редактировать' : 'Добавить задачу'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default Modal
