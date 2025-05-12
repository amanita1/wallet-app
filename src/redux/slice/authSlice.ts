import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    isAuthenticated: boolean
    token: string | null
    user: string | null
    name: string | null
    age: number | null
    salaryDate: string | null
    savingGoal: number | null
    initialized: boolean
}

const savedAuth = localStorage.getItem('auth')
const initialState: AuthState = savedAuth
    ? { ...JSON.parse(savedAuth), initialized: true }
    : {
        isAuthenticated: false,
        token: null,
        user: null,
        name: null,
        age: null,
        salaryDate: null,
        savingGoal: null,
        initialized: false,
    }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; user: string; name: string }>) => {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.user = action.payload.user
            state.name = action.payload.name
        },
        logout: state => {
            state.isAuthenticated = false
            state.token = null
            state.user = null
            state.name = null
            state.age = null
            state.salaryDate = null
            state.savingGoal = null
        },
        changeName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        updateProfile: (
            state,
            action: PayloadAction<{ age?: number; salaryDate?: string; savingGoal?: number }>
        ) => {
            if (action.payload.age !== undefined) state.age = action.payload.age
            if (action.payload.salaryDate !== undefined) state.salaryDate = action.payload.salaryDate
            if (action.payload.savingGoal !== undefined) state.savingGoal = action.payload.savingGoal
        },
        setInitialized: state => {
            state.initialized = true
        },
    },
})

export const { login, logout, changeName, updateProfile, setInitialized } = authSlice.actions
export default authSlice.reducer
