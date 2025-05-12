import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../redux/store'
import { logout } from '../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { changeName } from '../redux/slice/authSlice'
import { useState } from 'react'
import { updateProfile } from '../redux/slice/authSlice'



export default function Settings() {
    const name = useSelector((state: RootState) => state.auth.name)
    const [newName, setNewName] = useState(name || '')
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const age = useSelector((state: RootState) => state.auth.age)
    const salaryDate = useSelector((state: RootState) => state.auth.salaryDate)
    const savingGoal = useSelector((state: RootState) => state.auth.savingGoal)

    const [newAge, setNewAge] = useState(age || '')
    const [newSalaryDate, setNewSalaryDate] = useState(salaryDate || '')
    const [newGoal, setNewGoal] = useState(savingGoal || '')


    return (
        <>
            <ThemeToggle />
            <div className="animate-fadeInUp min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 px-4">
                <div className="w-full max-w-lg bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-70 dark:bg-opacity-80">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Настройки профиля</h2>

                    <div className="space-y-6 text-gray-800 dark:text-gray-200">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Пользователь:</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold">
                                    {name ? name[0].toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email:</p>
                                    <p className="text-lg font-medium">{user}</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm mb-1">Имя пользователя:</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                                <button
                                    onClick={() => dispatch(changeName(newName))}
                                    className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold"
                                >
                                    Сохранить имя
                                </button>
                                <div className="mt-6 space-y-4">
                                    <div>
                                        <label className="block text-sm mb-1">Возраст:</label>
                                        <input
                                            type="number"
                                            value={newAge}
                                            onChange={e => setNewAge(Number(e.target.value))}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Дата следующей зарплаты:</label>
                                        <input
                                            type="date"
                                            value={newSalaryDate}
                                            onChange={e => setNewSalaryDate(e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Цель отложенных денег (₸):</label>
                                        <input
                                            type="number"
                                            value={newGoal}
                                            onChange={e => setNewGoal(Number(e.target.value))}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600"
                                        />
                                    </div>

                                    <button
                                        onClick={() =>
                                            dispatch(
                                                updateProfile({
                                                    age: Number(newAge),
                                                    salaryDate: newSalaryDate,
                                                    savingGoal: Number(newGoal),
                                                })
                                            )

                                        }
                                        className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold"
                                    >
                                        Сохранить настройки
                                    </button>
                                </div>

                            </div>

                        </div>

                        <button
                            onClick={() => navigate('/dashboard')}
                            className="hover:scale-105 active:scale-95 transition duration-200 mb-6 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600 transition text-sm"
                        >
                            ← Назад в дэшборд
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full mt-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-semibold"
                        >
                            Выйти из аккаунта
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
