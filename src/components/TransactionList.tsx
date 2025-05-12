import { useSelector, useDispatch } from 'react-redux'
import type {RootState} from '../redux/store'
import { deleteTransaction, type Transaction } from '../redux/slice/transactionsSlice'
import { useState } from 'react'
import EditTransactionModal from './EditTransactionModal'


export default function TransactionList() {
    const transactions = useSelector((state: RootState) => state.transactions.list)
    const dispatch = useDispatch()
    const [editingTx, setEditingTx] = useState<Transaction | null>(null)
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
        setEditingTx(null)
    }

    if (transactions.length === 0) {
        return (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                Пока нет транзакций.
            </p>
        )
    }

    return (
        <div className="mt-8 space-y-4 relative">
            {saved && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[400px] bg-green-500 text-white text-center py-2 px-4 rounded-xl shadow-lg z-50">
                    ✅ Сохранено!
                </div>
            )}

            {transactions.map(tx => (
                <div
                    key={tx.id}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 rounded-xl shadow"
                >
                    <div>
                        <p className="text-sm text-gray-400">{tx.date}</p>
                        <p className="text-lg font-semibold">
                            {tx.type === 'income' ? '+' : '-'}₸ {tx.amount}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{tx.category}</p>
                        {tx.comment && <p className="text-xs italic text-gray-400 mt-1">"{tx.comment}"</p>}
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => setEditingTx(tx)} className="text-blue-500 hover:text-blue-700 font-semibold">
                            ✎
                        </button>
                        <button
                            onClick={() => dispatch(deleteTransaction(tx.id))}
                            className="text-red-500 hover:text-red-700 font-semibold"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}

            {editingTx && <EditTransactionModal tx={editingTx} onClose={handleSave} />}
        </div>
    )
}