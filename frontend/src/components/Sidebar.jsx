import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Clock,
  Wallet,
  FileText,
  Brain,
  Shield,
  LogOut,
} from 'lucide-react'

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'RH', 'EMPLOYE'] },
  { name: 'Employés', href: '/employes', icon: Users, roles: ['ADMIN', 'RH'] },
  { name: 'Congés', href: '/conges', icon: CalendarDays, roles: ['ADMIN', 'RH', 'EMPLOYE'] },
  { name: 'Présences', href: '/presences', icon: Clock, roles: ['ADMIN', 'RH', 'EMPLOYE'] },
  { name: 'Paie', href: '/paie', icon: Wallet, roles: ['ADMIN', 'RH'] },
  { name: 'Documents', href: '/documents', icon: FileText, roles: ['ADMIN', 'RH', 'EMPLOYE'] },
  { name: 'Analyse IA', href: '/ia', icon: Brain, roles: ['ADMIN', 'RH'] },
  { name: 'Utilisateurs', href: '/utilisateurs', icon: Shield, roles: ['ADMIN'] },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  const filteredNav = navigation.filter((item) => item.roles.includes(user?.role))

  return (
    <aside className="w-64 bg-sidebar flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">SGRH</h1>
            <p className="text-gray-400 text-xs">Intelligent</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNav.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User info + Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{user?.email}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-sidebar-hover rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
