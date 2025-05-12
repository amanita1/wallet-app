import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Transaction {
    id: string
    type: 'income' | 'expense'
    amount: number
    category: string
    date: string
    comment?: string
}

interface TransactionState {
    list: Transaction[]
}

// Загружаем из localStorage, если есть
const saved = localStorage.getItem('transactions')
const initialState: TransactionState = {
    list: saved ? JSON.parse(saved) : [],
}

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.list.push(action.payload)
        },
        editTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.list.findIndex(tx => tx.id === action.payload.id)
            if (index !== -1) {
                state.list[index] = action.payload
            }
        },
        deleteTransaction: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(tx => tx.id !== action.payload)
        },
        clearTransactions: state => {
            state.list = []
        },
    },
})

export const { addTransaction, deleteTransaction, clearTransactions, editTransaction } = transactionsSlice.actions
export default transactionsSlice.reducer
