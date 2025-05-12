import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark'
    })

    useEffect(() => {
        const root = window.document.documentElement
        if (dark) {
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [dark])

    return (

        <button
            onClick={() => setDark(prev => !prev)}
            className="absolute top-4 right-4 z-50 text-sm px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow"
        >
            {dark ? '☀️ Светлая' : '🌙 Тёмная'}
        </button>
    )
}
