import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import transactionsReducer from './slice/transactionsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        transactions: transactionsReducer,
    },
})

store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem('transactions', JSON.stringify(state.transactions.list))
    localStorage.setItem('auth', JSON.stringify(state.auth))
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

