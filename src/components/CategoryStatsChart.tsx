import { useSelector } from 'react-redux'
import type {RootState} from '../redux/store'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

const COLORS = ['#34D399', '#F87171', '#60A5FA', '#FBBF24', '#A78BFA', '#F472B6', '#4ADE80']

export default function CategoryStatsChart() {
    const transactions = useSelector((state: RootState) => state.transactions.list)

    const categoryTotals: Record<string, number> = {}

    transactions.forEach(tx => {
        const sign = tx.type === 'income' ? 1 : -1
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + sign * tx.amount
    })

    const data = Object.entries(categoryTotals).map(([category, total]) => ({
        name: category,
        value: Math.abs(total),
    }))

    if (data.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-400 mt-4">Нет данных для отображения.</p>
    }

    return (
        <div className="w-full h-96 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border dark:border-gray-700 mt-10">
            <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
                Распределение по категориям
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
