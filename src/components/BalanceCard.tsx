import { useSelector } from 'react-redux'
import type {RootState} from '../redux/store'

export default function BalanceCard() {
    const transactions = useSelector((state: RootState) => state.transactions.list)

    const income = transactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0)

    const expense = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0)

    const balance = income - expense

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700">
                <h2 className="text-sm text-gray-500">Доходы</h2>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">+₸ {income.toFixed(2)}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700">
                <h2 className="text-sm text-gray-500">Расходы</h2>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">-₸ {expense.toFixed(2)}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700">
                <h2 className="text-sm text-gray-500">Баланс</h2>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₸ {balance.toFixed(2)}</p>
            </div>
        </div>
    )
}
