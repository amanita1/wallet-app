import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTransaction } from '../redux/slice/transactionsSlice'
import { v4 as uuidv4 } from 'uuid'

export default function AddTransactionForm() {
    const dispatch = useDispatch()

    const [type, setType] = useState<'income' | 'expense'>('expense')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
    const [comment, setComment] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount || !category) return

        dispatch(
            addTransaction({
                id: uuidv4(),
                type,
                amount: parseFloat(amount),
                category,
                date,
                comment,
            })
        )

        // Очистка формы
        setAmount('')
        setCategory('')
        setComment('')
    }

    return (
        <form onSubmit={handleSubmit} className="animate-fadeInUp space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex gap-4 ">
                <label className="flex items-center gap-1">
                    <input type="radio" name="type" value="income" checked={type === 'income'} onChange={() => setType('income')} />
                    Доход
                </label>
                <label className="flex items-center gap-1">
                    <input type="radio" name="type" value="expense" checked={type === 'expense'} onChange={() => setType('expense')} />
                    Расход
                </label>
            </div>

            <input
                type="number"
                placeholder="Сумма"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            <input
                type="text"
                placeholder="Категория"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            <textarea
                placeholder="Комментарий (необязательно)"
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            <button
                type="submit"
                className="hover:scale-105 active:scale-95 transition duration-200 w-full py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-semibold"
            >
                Добавить транзакцию
            </button>
        </form>
    )
}
