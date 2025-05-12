import { useSelector } from 'react-redux'
import { type RootState } from '../redux/store'

export default function SavingGoalProgress() {
    const { savingGoal } = useSelector((state: RootState) => state.auth)
    const transactions = useSelector((state: RootState) => state.transactions.list)

    const income = transactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0)

    const expense = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0)

    const balance = income - expense

    if (!savingGoal || savingGoal <= 0) return null

    const progress = Math.min((balance / savingGoal) * 100, 100)

    return (
        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700 animate-fadeInUp">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">🎯 Цель накоплений</h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Цель: <span className="font-medium text-gray-700 dark:text-white">₸ {savingGoal}</span><br />
                Накоплено: <span className="text-green-600 dark:text-green-400 font-semibold">₸ {balance.toFixed(2)}</span>
            </p>

            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-green-500 transition-all duration-500"
                ></div>
            </div>

            <p className="text-right text-xs text-gray-600 dark:text-gray-400 mt-1">{progress.toFixed(1)}%</p>
        </div>
    )
}
