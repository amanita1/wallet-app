import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { type RootState } from '../redux/store'

export default function AutoLoginRedirect() {
    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)
    const initialized = useSelector((state: RootState) => state.auth.initialized)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const onAuthPage = location.pathname === '/login' || location.pathname === '/register'
        if (initialized && isAuth && onAuthPage) {
            navigate('/dashboard')
        }
    }, [isAuth, initialized, location.pathname])

    return null
}
