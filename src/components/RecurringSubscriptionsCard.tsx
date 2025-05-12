import { useSelector } from 'react-redux'
import {type RootState } from '../redux/store'

interface Subscription {
    category: string
    amount: number
    count: number
}

export default function RecurringSubscriptionsCard() {
    const transactions = useSelector((state: RootState) => state.transactions.list)

    // Фильтруем только расходы
    const expenses = transactions.filter(tx => tx.type === 'expense')

    // Группировка по категории + сумме
    const groups: Record<string, Subscription> = {}

    expenses.forEach(tx => {
        const key = `${tx.category}_${tx.amount}`
        if (!groups[key]) {
            groups[key] = { category: tx.category, amount: tx.amount, count: 1 }
        } else {
            groups[key].count++
        }
    })

    // Оставляем только те, которые повторяются хотя бы 2 раза
    const recurring = Object.values(groups).filter(item => item.count >= 2)

    if (recurring.length === 0) return null

    return (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700 animate-fadeInUp">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">📋 Подписки</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Распознаны повторяющиеся траты — возможно, это подписки:
            </p>

            <ul className="space-y-2">
                {recurring.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                        • {item.category} — ₸{item.amount} / мес ({item.count}×)
                    </li>
                ))}
            </ul>
        </div>
    )
}
