import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTransaction, type Transaction } from '../redux/slice/transactionsSlice'


export default function EditTransactionModal({
                                                 tx,
                                                 onClose,
                                             }: {
    tx: Transaction
    onClose: () => void
}) {
    const dispatch = useDispatch()
    const [type, setType] = useState<'income' | 'expense'>(tx.type)
    const [amount, setAmount] = useState(tx.amount.toString())
    const [category, setCategory] = useState(tx.category)
    const [date, setDate] = useState(tx.date)
    const [comment, setComment] = useState(tx.comment || '')

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(
            editTransaction({
                id: tx.id,
                type,
                amount: parseFloat(amount),
                category,
                date,
                comment,
            })
        )
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    ✏️ Редактировать транзакцию
                </h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="flex gap-4 justify-center">
                        <label className="flex items-center gap-2">
                            <input type="radio" value="income" checked={type === 'income'} onChange={() => setType('income')} />
                            Доход
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" value="expense" checked={type === 'expense'} onChange={() => setType('expense')} />
                            Расход
                        </label>
                    </div>

                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Сумма"
                    />

                    <input
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Категория"
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Комментарий"
                    />

                    <div className="flex justify-between gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}