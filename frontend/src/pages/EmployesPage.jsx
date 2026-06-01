import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Eye, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const mockEmployes = [
  { id: 1, matricule: 'EMP-001', nom: 'Benali', prenom: 'Ahmed', poste: 'Développeur Full-Stack', departement: 'IT', salaire: 12000, soldeConge: 18, actif: true },
  { id: 2, matricule: 'EMP-002', nom: 'Zahra', prenom: 'Fatima', poste: 'Designer UI/UX', departement: 'IT', salaire: 11000, soldeConge: 15, actif: true },
  { id: 3, matricule: 'EMP-003', nom: 'Idrissi', prenom: 'Karim', poste: 'Comptable', departement: 'Finance', salaire: 10000, soldeConge: 20, actif: true },
  { id: 4, matricule: 'EMP-004', nom: 'Moussaid', prenom: 'Sara', poste: 'Chargée Marketing', departement: 'Marketing', salaire: 9500, soldeConge: 18, actif: true },
  { id: 5, matricule: 'EMP-005', nom: 'Tazi', prenom: 'Omar', poste: 'Technicien Réseau', departement: 'IT', salaire: 8500, soldeConge: 12, actif: false },
]

export default function EmployesPage() {
  const [employes, setEmployes] = useState(mockEmployes)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedEmploye, setSelectedEmploye] = useState(null)
  const [formData, setFormData] = useState({
    matricule: '', nom: '', prenom: '', poste: '', departement: '', salaire: '', email: '', soldeConge: 18, actif: true
  })

  const filtered = employes.filter(e =>
    `${e.nom} ${e.prenom} ${e.matricule} ${e.departement}`.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalMode === 'edit' && selectedEmploye) {
      setEmployes(employes.map(emp => emp.id === selectedEmploye.id ? {
        ...emp,
        ...formData,
        salaire: Number(formData.salaire),
        soldeConge: Number(formData.soldeConge),
      } : emp))
      toast.success('Employé modifié avec succès')
    } else {
      setEmployes([
        ...employes,
        {
          id: Math.max(...employes.map(emp => emp.id), 0) + 1,
          ...formData,
          salaire: Number(formData.salaire),
          soldeConge: Number(formData.soldeConge),
        },
      ])
      toast.success('Employé ajouté avec succès')
    }
    setShowModal(false)
    setSelectedEmploye(null)
    setFormData({ matricule: '', nom: '', prenom: '', poste: '', departement: '', salaire: '', email: '', soldeConge: 18, actif: true })
  }

  const openCreateModal = () => {
    setModalMode('create')
    setSelectedEmploye(null)
    setFormData({ matricule: '', nom: '', prenom: '', poste: '', departement: '', salaire: '', email: '', soldeConge: 18, actif: true })
    setShowModal(true)
  }

  const openViewModal = (employe) => {
    setModalMode('view')
    setSelectedEmploye(employe)
    setShowModal(true)
  }

  const openEditModal = (employe) => {
    setModalMode('edit')
    setSelectedEmploye(employe)
    setFormData({
      matricule: employe.matricule,
      nom: employe.nom,
      prenom: employe.prenom,
      poste: employe.poste,
      departement: employe.departement,
      salaire: employe.salaire,
      email: employe.email || '',
      soldeConge: employe.soldeConge,
      actif: employe.actif,
    })
    setShowModal(true)
  }

  const handleDelete = (employe) => {
    if (window.confirm(`Supprimer l'employé ${employe.prenom} ${employe.nom} ?`)) {
      setEmployes(employes.filter(emp => emp.id !== employe.id))
      toast.success('Employé supprimé avec succès')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Employés</h1>
          <p className="text-gray-500 mt-1">{employes.length} employés enregistrés</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvel employé
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, matricule, département..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employé</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Matricule</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Poste</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Département</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Salaire</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-700 font-semibold text-sm">
                          {emp.prenom[0]}{emp.nom[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{emp.prenom} {emp.nom}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{emp.matricule}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{emp.poste}</td>
                  <td className="px-6 py-4">
                    <span className="badge-info">{emp.departement}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {emp.salaire.toLocaleString('fr-MA')} MAD
                  </td>
                  <td className="px-6 py-4">
                    <span className={emp.actif ? 'badge-success' : 'badge-danger'}>
                      {emp.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openViewModal(emp)} title="Visualiser" className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openEditModal(emp)} title="Modifier" className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(emp)} title="Supprimer" className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === 'view' ? 'Détail de l’employé' : modalMode === 'edit' ? 'Modifier l’employé' : 'Nouvel Employé'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {modalMode === 'view' ? 'Informations complètes de l’employé' : 'Remplissez les informations de l’employé'}
              </p>
            </div>
            {modalMode === 'view' ? (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Nom :</span> <span className="font-medium">{selectedEmploye.prenom} {selectedEmploye.nom}</span></div>
                  <div><span className="text-gray-500">Matricule :</span> <span className="font-medium">{selectedEmploye.matricule}</span></div>
                  <div><span className="text-gray-500">Poste :</span> <span className="font-medium">{selectedEmploye.poste}</span></div>
                  <div><span className="text-gray-500">Département :</span> <span className="font-medium">{selectedEmploye.departement}</span></div>
                  <div><span className="text-gray-500">Salaire :</span> <span className="font-medium">{selectedEmploye.salaire.toLocaleString('fr-MA')} MAD</span></div>
                  <div><span className="text-gray-500">Solde congé :</span> <span className="font-medium">{selectedEmploye.soldeConge} jours</span></div>
                  <div><span className="text-gray-500">Statut :</span> <span className={selectedEmploye.actif ? 'badge-success' : 'badge-danger'}>{selectedEmploye.actif ? 'Actif' : 'Inactif'}</span></div>
                </div>
                <button onClick={() => setShowModal(false)} className="btn-secondary w-full">Fermer</button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input type="text" className="input-field" required value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input type="text" className="input-field" required value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="input-field" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                  <input type="text" className="input-field" value={formData.poste} onChange={e => setFormData({...formData, poste: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                  <select className="input-field" value={formData.departement} onChange={e => setFormData({...formData, departement: e.target.value})}>
                    <option value="">Sélectionner</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="RH">Ressources Humaines</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salaire (MAD)</label>
                <input type="number" className="input-field" value={formData.salaire} onChange={e => setFormData({...formData, salaire: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Solde congé</label>
                  <input type="number" className="input-field" value={formData.soldeConge} onChange={e => setFormData({...formData, soldeConge: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select className="input-field" value={formData.actif ? 'true' : 'false'} onChange={e => setFormData({...formData, actif: e.target.value === 'true'})}>
                    <option value="true">Actif</option>
                    <option value="false">Inactif</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">
                  Annuler
                </button>
                <button type="submit" className="btn-primary flex-1">
                  {modalMode === 'edit' ? 'Modifier' : 'Enregistrer'}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
