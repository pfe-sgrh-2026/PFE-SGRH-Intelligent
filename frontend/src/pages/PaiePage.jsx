import { useState } from 'react'
import { Wallet, Download, FileText, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockFiches = [
  { id: 1, employe: 'Ahmed Benali', mois: 5, annee: 2025, salaireBase: 12000, salaireNet: 9840 },
  { id: 2, employe: 'Fatima Zahra', mois: 5, annee: 2025, salaireBase: 11000, salaireNet: 9020 },
  { id: 3, employe: 'Karim Idrissi', mois: 5, annee: 2025, salaireBase: 10000, salaireNet: 8200 },
  { id: 4, employe: 'Sara Moussaid', mois: 5, annee: 2025, salaireBase: 9500, salaireNet: 7790 },
  { id: 5, employe: 'Omar Tazi', mois: 5, annee: 2025, salaireBase: 8500, salaireNet: 6970 },
]

const masseSalariale = [
  { mois: 'Jan', montant: 48000 },
  { mois: 'Fév', montant: 48500 },
  { mois: 'Mar', montant: 49000 },
  { mois: 'Avr', montant: 49500 },
  { mois: 'Mai', montant: 51000 },
  { mois: 'Jun', montant: 51000 },
]

const moisLabels = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

export default function PaiePage() {
  const [fiches] = useState(mockFiches)

  const totalMasse = fiches.reduce((acc, f) => acc + f.salaireNet, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion de la Paie</h1>
          <p className="text-gray-500 mt-1">Fiches de paie et masse salariale</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Générer les fiches
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-50">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Masse salariale nette</p>
              <p className="text-2xl font-bold text-gray-900">{totalMasse.toLocaleString('fr-MA')} MAD</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Salaire moyen</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(totalMasse / fiches.length).toLocaleString('fr-MA')} MAD</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-50">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fiches générées</p>
              <p className="text-2xl font-bold text-gray-900">{fiches.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution masse salariale</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={masseSalariale}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mois" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => [`${value.toLocaleString('fr-MA')} MAD`, 'Montant']} contentStyle={{ borderRadius: '8px' }} />
            <Bar dataKey="montant" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Fiches de paie - Mai 2025</h3>
          <button className="btn-secondary text-sm flex items-center gap-1">
            <Download className="w-4 h-4" />
            Exporter PDF
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Employé</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Période</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Salaire Brut</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Salaire Net</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fiches.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{f.employe}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{moisLabels[f.mois]} {f.annee}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-600">{f.salaireBase.toLocaleString('fr-MA')} MAD</td>
                  <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">{f.salaireNet.toLocaleString('fr-MA')} MAD</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Télécharger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
