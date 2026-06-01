import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import EmployesPage from './pages/EmployesPage'
import CongesPage from './pages/CongesPage'
import PresencesPage from './pages/PresencesPage'
import PaiePage from './pages/PaiePage'
import DocumentsPage from './pages/DocumentsPage'
import IAPage from './pages/IAPage'
import UsersPage from './pages/UsersPage'

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />

  return children
}

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="employes" element={
          <ProtectedRoute roles={['ADMIN', 'RH']}>
            <EmployesPage />
          </ProtectedRoute>
        } />
        <Route path="conges" element={<CongesPage />} />
        <Route path="presences" element={<PresencesPage />} />
        <Route path="paie" element={
          <ProtectedRoute roles={['ADMIN', 'RH']}>
            <PaiePage />
          </ProtectedRoute>
        } />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="ia" element={
          <ProtectedRoute roles={['ADMIN', 'RH']}>
            <IAPage />
          </ProtectedRoute>
        } />
        <Route path="utilisateurs" element={
          <ProtectedRoute roles={['ADMIN']}>
            <UsersPage />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
