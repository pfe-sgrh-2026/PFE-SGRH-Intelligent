import { useState } from 'react'
import { Shield, Plus, Edit2, Trash2, UserCheck, UserX } from 'lucide-react'
import toast from 'react-hot-toast'

const mockUsers = [
  { id: 1, email: 'admin@sgrh.ma', role: 'ADMIN', actif: true, lastLogin: '2025-05-19 08:30' },
  { id: 2, email: 'rh@sgrh.ma', role: 'RH', actif: true, lastLogin: '2025-05-19 09:00' },
  { id: 3, email: 'ahmed.benali@sgrh.ma', role: 'EMPLOYE', actif: true, lastLogin: '2025-05-19 08:45' },
  { id: 4, email: 'fatima.zahra@sgrh.ma', role: 'EMPLOYE', actif: true, lastLogin: '2025-05-18 17:00' },
  { id: 5, email: 'karim.idrissi@sgrh.ma', role: 'EMPLOYE', actif: true, lastLogin: '2025-05-19 10:15' },
  { id: 6, email: 'sara.moussaid@sgrh.ma', role: 'EMPLOYE', actif: true, lastLogin: '2025-05-17 08:00' },
  { id: 7, email: 'omar.tazi@sgrh.ma', role: 'EMPLOYE', actif: false, lastLogin: '2025-05-10 09:30' },
]

const roleColors = {
  ADMIN: 'bg-purple-100 text-purple-800',
  RH: 'bg-blue-100 text-blue-800',
  EMPLOYE: 'bg-gray-100 text-gray-800',
}

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedUser, setSelectedUser] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'EMPLOYE',
    actif: true,
  })

  const openCreateModal = () => {
    setModalMode('create')
    setSelectedUser(null)
    setFormData({ email: '', password: '', role: 'EMPLOYE', actif: true })
    setShowModal(true)
  }

  const openEditModal = (user) => {
    setModalMode('edit')
    setSelectedUser(user)
    setFormData({ email: user.email, password: '', role: user.role, actif: user.actif })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalMode === 'edit' && selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, email: formData.email, role: formData.role, actif: formData.actif } : u))
      toast.success('Compte modifié avec succès')
    } else {
      setUsers([
        ...users,
        {
          id: Math.max(...users.map(u => u.id), 0) + 1,
          email: formData.email,
          role: formData.role,
          actif: formData.actif,
          lastLogin: 'Jamais',
        },
      ])
      toast.success('Compte créé avec succès')
    }
    setShowModal(false)
  }

  const handleDelete = (user) => {
    if (window.confirm(`Supprimer le compte ${user.email} ?`)) {
      setUsers(users.filter(u => u.id !== user.id))
      toast.success('Compte supprimé avec succès')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-500 mt-1">{users.length} comptes enregistrés</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouveau compte
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{users.filter(u => u.role === 'ADMIN').length}</p>
            <p className="text-sm text-gray-500">Administrateurs</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50">
            <UserCheck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{users.filter(u => u.actif).length}</p>
            <p className="text-sm text-gray-500">Comptes actifs</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-50">
            <UserX className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{users.filter(u => !u.actif).length}</p>
            <p className="text-sm text-gray-500">Comptes désactivés</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Rôle</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Dernière connexion</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-700 text-xs font-bold">{u.email[0].toUpperCase()}</span>
                      </div>
                      <span className="font-medium text-gray-900">{u.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={u.actif ? 'badge-success' : 'badge-danger'}>
                      {u.actif ? 'Actif' : 'Désactivé'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{u.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditModal(u)} title="Modifier" className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(u)} title="Supprimer" className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === 'edit' ? 'Modifier le compte utilisateur' : 'Nouveau compte utilisateur'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="input-field" required placeholder="utilisateur@sgrh.ma" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <input type="password" className="input-field" required={modalMode === 'create'} placeholder={modalMode === 'edit' ? 'Laisser vide pour conserver' : '••••••••'} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select className="input-field" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="EMPLOYE">Employé</option>
                  <option value="RH">Responsable RH</option>
                  <option value="ADMIN">Administrateur</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select className="input-field" value={formData.actif ? 'true' : 'false'} onChange={e => setFormData({...formData, actif: e.target.value === 'true'})}>
                  <option value="true">Actif</option>
                  <option value="false">Désactivé</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Annuler</button>
                <button type="submit" className="btn-primary flex-1">
                  {modalMode === 'edit' ? 'Modifier le compte' : 'Créer le compte'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
