import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import AutoLoginRedirect from './components/AutoLoginRedirect'

function App() {
    return (
        <BrowserRouter>
            {/* Вся страница: flex, чтобы футер всегда был снизу */}
            <div className="min-h-screen flex flex-col justify-between">
                {/* Автоматический редирект если уже залогинен */}
                <AutoLoginRedirect />

                {/* Контент */}
                <main className="flex-grow">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={<Login />} />
                    </Routes>
                </main>

                {/* Футер — отображается на всех страницах */}
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
