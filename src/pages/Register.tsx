import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/slice/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { type RootState } from '../redux/store'
import ThemeToggle from '../components/ThemeToggle'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({})

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)

    useEffect(() => {
        if (isAuth) {
            navigate('/dashboard')
        }
    }, [isAuth])

    const validate = () => {
        const newErrors: typeof errors = {}
        if (!email.includes('@')) newErrors.email = 'Введите корректный email'
        if (password.length < 6) newErrors.password = 'Пароль слишком короткий'
        if (confirm !== password) newErrors.confirm = 'Пароли не совпадают'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        const fakeToken = 'def456token'
        dispatch(login({ token: fakeToken, user: email, name: 'User' }))
    }

    return (
        <>
            <ThemeToggle />
            <div className="animate-fadeInUp min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-200 to-purple-400 dark:from-gray-900 dark:to-gray-800">
                <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Регистрация</h2>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1" htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1" htmlFor="password">Пароль</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1" htmlFor="confirm">Подтвердите пароль</label>
                            <input
                                id="confirm"
                                name="confirm"
                                type="password"
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                            {errors.confirm && <p className="text-sm text-red-500 mt-1">{errors.confirm}</p>}
                        </div>

                        <button
                            type="submit"
                            className="hover:scale-105 active:scale-95 transition duration-200 w-full py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-semibold"
                        >
                            Зарегистрироваться
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Уже есть аккаунт?{' '}
                        <Link
                            to="/login"
                            className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                        >
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
