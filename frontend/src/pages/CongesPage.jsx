import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Plus, Check, X, Calendar, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

const mockConges = [
  { id: 1, employe: 'Ahmed Benali', dateDebut: '2025-07-01', dateFin: '2025-07-05', nbJours: 5, type: 'ANNUEL', statut: 'VALIDE', motif: 'Vacances familiales' },
  { id: 2, employe: 'Fatima Zahra', dateDebut: '2025-06-10', dateFin: '2025-06-12', nbJours: 3, type: 'MALADIE', statut: 'VALIDE', motif: 'Grippe saisonnière' },
  { id: 3, employe: 'Karim Idrissi', dateDebut: '2025-08-01', dateFin: '2025-08-10', nbJours: 8, type: 'ANNUEL', statut: 'EN_ATTENTE', motif: 'Voyage personnel' },
  { id: 4, employe: 'Sara Moussaid', dateDebut: '2025-05-20', dateFin: '2025-05-22', nbJours: 3, type: 'SANS_SOLDE', statut: 'REFUSE', motif: 'Raison personnelle' },
  { id: 5, employe: 'Omar Tazi', dateDebut: '2025-09-15', dateFin: '2025-09-17', nbJours: 3, type: 'ANNUEL', statut: 'EN_ATTENTE', motif: 'Événement familial' },
]

const statutColors = {
  EN_ATTENTE: 'badge-warning',
  VALIDE: 'badge-success',
  REFUSE: 'badge-danger',
}

const statutLabels = {
  EN_ATTENTE: 'En attente',
  VALIDE: 'Validé',
  REFUSE: 'Refusé',
}

const typeLabels = {
  ANNUEL: 'Annuel',
  MALADIE: 'Maladie',
  SANS_SOLDE: 'Sans solde',
}

export default function CongesPage() {
  const { user } = useAuth()
  const [conges] = useState(mockConges)
  const [filter, setFilter] = useState('TOUS')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    dateDebut: '', dateFin: '', type: 'ANNUEL', motif: ''
  })

  const isRH = user?.role === 'RH' || user?.role === 'ADMIN'

  const filtered = filter === 'TOUS' ? conges : conges.filter(c => c.statut === filter)

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Demande de congé soumise')
    setShowModal(false)
  }

  const handleValider = (id) => {
    toast.success(`Congé #${id} validé`)
  }

  const handleRefuser = (id) => {
    toast.error(`Congé #${id} refusé`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Congés</h1>
          <p className="text-gray-500 mt-1">
            {conges.filter(c => c.statut === 'EN_ATTENTE').length} demandes en attente
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle demande
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {['TOUS', 'EN_ATTENTE', 'VALIDE', 'REFUSE'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f === 'TOUS' ? 'Tous' : statutLabels[f]}
          </button>
        ))}
      </div>

      {/* Cards List */}
      <div className="grid gap-4">
        {filtered.map((conge) => (
          <div key={conge.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{conge.employe}</h3>
                    <span className={statutColors[conge.statut]}>{statutLabels[conge.statut]}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {conge.dateDebut} → {conge.dateFin} · {conge.nbJours} jours · {typeLabels[conge.type]}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">Motif : {conge.motif}</p>
                </div>
              </div>

              {isRH && conge.statut === 'EN_ATTENTE' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleValider(conge.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Valider
                  </button>
                  <button
                    onClick={() => handleRefuser(conge.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Refuser
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Demande */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nouvelle demande de congé</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
                  <input type="date" className="input-field" required value={formData.dateDebut} onChange={e => setFormData({...formData, dateDebut: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
                  <input type="date" className="input-field" required value={formData.dateFin} onChange={e => setFormData({...formData, dateFin: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de congé</label>
                <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="ANNUEL">Annuel</option>
                  <option value="MALADIE">Maladie</option>
                  <option value="SANS_SOLDE">Sans solde</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motif</label>
                <textarea className="input-field" rows={3} value={formData.motif} onChange={e => setFormData({...formData, motif: e.target.value})} placeholder="Décrivez la raison..."></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Annuler</button>
                <button type="submit" className="btn-primary flex-1">Soumettre</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
