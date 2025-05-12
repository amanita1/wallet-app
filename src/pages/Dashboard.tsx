import { useDispatch, useSelector } from 'react-redux'
import type {RootState} from '../redux/store'
import { logout } from '../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import AddTransactionForm from '../components/AddTransactionForm'
import TransactionList from '../components/TransactionList'
import BalanceCard from '../components/BalanceCard'
import CategoryStatsChart from '../components/CategoryStatsChart'
import DateFilteredBarChart from '../components/DateFilteredBarChart'



export default function Dashboard() {
    useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const name = useSelector((state: RootState) => state.auth.name)
    const email = useSelector((state: RootState) => state.auth.user)


    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <>
            <ThemeToggle />
            <div className="min-h-screen bg-gradient-to-br from-green-200 to-teal-400 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-4 py-10">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-10 backdrop-blur-md bg-opacity-70 dark:bg-opacity-80">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">
                            Привет, {name || email || 'пользователь'} 👋
                        </h1>

                        <button
                            onClick={() => navigate('/settings')}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm"
                        >
                            Настройки
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition"
                        >
                            Выйти
                        </button>

                    </div>

                    <p className="mt-6 text-lg">
                        Это твой Dashboard — здесь будут транзакции, баланс, подписки, графики и всё, что связано с деньгами 💰
                    </p>
                    <BalanceCard />
                    <div className="mt-10">
                        <AddTransactionForm />
                    </div>
                    <div className="mt-10">
                        <TransactionList />
                    </div>
                    <CategoryStatsChart />
                    <DateFilteredBarChart />

                </div>
            </div>
        </>
    )
}
