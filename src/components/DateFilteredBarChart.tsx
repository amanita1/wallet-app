import { useSelector } from 'react-redux'
import type {RootState} from '../redux/store'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'
import { useState } from 'react'

export default function DateFilteredBarChart() {
    const transactions = useSelector((state: RootState) => state.transactions.list)

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    const filtered = transactions.filter(tx => {
        const date = new Date(tx.date)
        const fromDate = from ? new Date(from) : null
        const toDate = to ? new Date(to) : null
        return (!fromDate || date >= fromDate) && (!toDate || date <= toDate)
    })

    const categorySums: Record<string, number> = {}

    filtered.forEach(tx => {
        const value = tx.type === 'income' ? tx.amount : -tx.amount
        categorySums[tx.category] = (categorySums[tx.category] || 0) + value
    })

    const data = Object.entries(categorySums).map(([category, value]) => ({
        category,
        value: +value.toFixed(2),
    }))

    return (
        <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border dark:border-gray-700 mt-10">
            <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-6">
                Категории по дате (BarChart)
            </h2>

            <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
                <div className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
                    <label>С даты:</label>
                    <input
                        type="date"
                        value={from}
                        onChange={e => setFrom(e.target.value)}
                        className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    />
                </div>
                <div className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
                    <label>По дату:</label>
                    <input
                        type="date"
                        value={to}
                        onChange={e => setTo(e.target.value)}
                        className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    />
                </div>
            </div>

            {data.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Нет данных для выбранного периода.</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#6366F1" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}
