import { useSelector } from 'react-redux'
import type {RootState} from '../redux/store'

export default function DailyLimitCard() {
    const { salaryDate, savingGoal } = useSelector((state: RootState) => state.auth)
    const transactions = useSelector((state: RootState) => state.transactions.list)

    if (!salaryDate) return null

    const today = new Date()
    const payday = new Date(salaryDate)
    const daysLeft = Math.max(Math.ceil((payday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)), 1)

    const income = transactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0)

    const expense = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0)

    const balance = income - expense
    const targetBalance = savingGoal ? savingGoal : 0

    const availableForSpending = Math.max(balance - targetBalance, 0)
    const dailyLimit = (availableForSpending / daysLeft).toFixed(2)

    const todaySpent = transactions
        .filter(tx => tx.type === 'expense' && new Date(tx.date).toDateString() === today.toDateString())
        .reduce((sum, tx) => sum + tx.amount, 0)

    const overLimit = todaySpent > parseFloat(dailyLimit)

    return (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700 animate-fadeInUp">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">📅 Ежедневный лимит</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                До зарплаты: <span className="font-medium text-gray-800 dark:text-white">{daysLeft} дн.</span>
            </p>
            {savingGoal && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Цель: ₸{savingGoal} | Баланс: ₸{balance}
                </p>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-200">
                Можно тратить в день: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">₸{dailyLimit}</span>
            </p>

            {overLimit && (
                <div className="mt-3 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm rounded-xl border border-red-300 dark:border-red-700">
                    ⚠️ Сегодня вы потратили больше дневного лимита (₸{todaySpent.toFixed(2)})
                </div>
            )}
        </div>
    )
}
