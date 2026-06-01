import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('sgrh_user')
    const token = localStorage.getItem('sgrh_token')
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('sgrh_user', JSON.stringify(userData))
    localStorage.setItem('sgrh_token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('sgrh_user')
    localStorage.removeItem('sgrh_token')
    setUser(null)
  }

  const getToken = () => localStorage.getItem('sgrh_token')

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
