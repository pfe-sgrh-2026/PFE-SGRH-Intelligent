import { useAuth } from '../context/AuthContext'
import { Bell, Search } from 'lucide-react'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un employé, un congé..."
            className="input-field pl-10"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-700 text-sm font-semibold">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.email?.split('@')[0]}</p>
              <p className="text-xs text-gray-500">{
                user?.role === 'ADMIN' ? 'Administrateur' :
                user?.role === 'RH' ? 'Responsable RH' : 'Employé'
              }</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
