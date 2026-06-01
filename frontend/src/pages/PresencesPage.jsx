import { useState } from 'react'
import { Clock, CheckCircle, AlertCircle, UserCheck } from 'lucide-react'

const mockPresences = [
  { id: 1, employe: 'Ahmed Benali', date: '2025-05-19', heureArrivee: '08:30', heureDepart: '17:00', estEnRetard: true },
  { id: 2, employe: 'Fatima Zahra', date: '2025-05-19', heureArrivee: '08:00', heureDepart: '17:00', estEnRetard: false },
  { id: 3, employe: 'Karim Idrissi', date: '2025-05-19', heureArrivee: '07:55', heureDepart: '17:00', estEnRetard: false },
  { id: 4, employe: 'Sara Moussaid', date: '2025-05-19', heureArrivee: '09:15', heureDepart: '17:00', estEnRetard: true },
  { id: 5, employe: 'Omar Tazi', date: '2025-05-19', heureArrivee: '08:00', heureDepart: '16:30', estEnRetard: false },
]

const statsPresence = {
  presents: 142,
  absents: 14,
  retards: 8,
  total: 156,
}

export default function PresencesPage() {
  const [presences] = useState(mockPresences)
  const [selectedDate, setSelectedDate] = useState('2025-05-19')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Présences</h1>
          <p className="text-gray-500 mt-1">Suivi en temps réel des pointages</p>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input-field w-auto"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-green-50">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{statsPresence.presents}</p>
            <p className="text-sm text-gray-500">Présents</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-50">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{statsPresence.absents}</p>
            <p className="text-sm text-gray-500">Absents</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-yellow-50">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{statsPresence.retards}</p>
            <p className="text-sm text-gray-500">Retards</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{Math.round((statsPresence.presents / statsPresence.total) * 100)}%</p>
            <p className="text-sm text-gray-500">Taux présence</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Pointages du {selectedDate}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Employé</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Arrivée</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Départ</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Durée</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {presences.map((p) => {
                const arrivee = p.heureArrivee.split(':')
                const depart = p.heureDepart.split(':')
                const duree = (parseInt(depart[0]) - parseInt(arrivee[0])) + 'h' + Math.abs(parseInt(depart[1]) - parseInt(arrivee[1])) + 'min'
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-700 text-xs font-semibold">
                            {p.employe.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{p.employe}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.date}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{p.heureArrivee}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{p.heureDepart}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{duree}</td>
                    <td className="px-6 py-4">
                      {p.estEnRetard ? (
                        <span className="badge-warning">En retard</span>
                      ) : (
                        <span className="badge-success">À l'heure</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
