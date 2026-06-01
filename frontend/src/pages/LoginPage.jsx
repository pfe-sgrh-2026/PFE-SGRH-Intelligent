import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/api'
import { Brain, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await authService.login({ email, motDePasse: password })
      const { token, user } = response.data
      login(user, token)
      toast.success('Connexion réussie !')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Identifiants incorrects')
    } finally {
      setLoading(false)
    }
  }

  // Mode démo - connexion sans backend
  const handleDemoLogin = (role) => {
    const demoUsers = {
      ADMIN: { id: 1, email: 'admin@sgrh.ma', role: 'ADMIN' },
      RH: { id: 2, email: 'rh@sgrh.ma', role: 'RH' },
      EMPLOYE: { id: 3, email: 'ahmed.benali@sgrh.ma', role: 'EMPLOYE' },
    }
    login(demoUsers[role], 'demo-token-' + role)
    toast.success(`Connexion démo (${role})`)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-700 via-primary-800 to-sidebar items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">SGRH Intelligent</h1>
          <p className="text-primary-200 text-lg leading-relaxed">
            Système de Gestion des Ressources Humaines avec Intelligence Artificielle
            et Analyse OCR de Documents
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold text-white">IA</p>
              <p className="text-primary-200 text-xs mt-1">Détection anomalies</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold text-white">OCR</p>
              <p className="text-primary-200 text-xs mt-1">Analyse documents</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold text-white">RH</p>
              <p className="text-primary-200 text-xs mt-1">Gestion complète</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden w-16 h-16 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
            <p className="text-gray-500 mt-2">Accédez à votre espace de gestion RH</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.ma"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Connexion...
                </span>
              ) : 'Se connecter'}
            </button>
          </form>

          {/* Demo buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">Mode démonstration (sans backend)</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => handleDemoLogin('ADMIN')} className="btn-secondary text-xs py-2">
                Admin
              </button>
              <button onClick={() => handleDemoLogin('RH')} className="btn-secondary text-xs py-2">
                RH
              </button>
              <button onClick={() => handleDemoLogin('EMPLOYE')} className="btn-secondary text-xs py-2">
                Employé
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
