import { type ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { type RootState } from '../redux/store'

export default function ProtectedRoute({ children }: { children: ReactElement }) {
    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)
    const initialized = useSelector((state: RootState) => state.auth.initialized)

    // Пока Redux не готов — не рендерим ничего
    if (!initialized) return null

    return isAuth ? children : <Navigate to="/login" />
}
