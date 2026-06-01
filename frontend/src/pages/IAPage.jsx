import { useState } from 'react'
import { Brain, Play, AlertTriangle, Users, TrendingUp } from 'lucide-react'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, BarChart, Bar
} from 'recharts'
import toast from 'react-hot-toast'

const CLUSTER_COLORS = ['#10b981', '#f59e0b', '#ef4444']

const mockAnomalies = [
  { id: 1, employe: 'Ahmed Benali', score: 0.82, type: 'Retards fréquents', risque: 'ELEVE', cluster: 1, date: '2025-05-19' },
  { id: 2, employe: 'Sara Moussaid', score: 0.75, type: 'Absences groupées', risque: 'ELEVE', cluster: 2, date: '2025-05-18' },
  { id: 3, employe: 'Omar Tazi', score: 0.61, type: 'Retard ponctuel', risque: 'MOYEN', cluster: 1, date: '2025-05-17' },
  { id: 4, employe: 'Karim Idrissi', score: 0.45, type: 'Irrégularité horaire', risque: 'FAIBLE', cluster: 1, date: '2025-05-16' },
]

const mockClusterData = [
  { x: 8.0, y: 8.5, cluster: 0 }, { x: 8.1, y: 8.2, cluster: 0 }, { x: 7.9, y: 8.8, cluster: 0 },
  { x: 8.0, y: 8.0, cluster: 0 }, { x: 8.2, y: 8.3, cluster: 0 }, { x: 7.8, y: 8.1, cluster: 0 },
  { x: 9.0, y: 7.5, cluster: 1 }, { x: 9.2, y: 7.0, cluster: 1 }, { x: 8.8, y: 7.2, cluster: 1 },
  { x: 9.5, y: 6.8, cluster: 1 }, { x: 9.1, y: 7.3, cluster: 1 },
  { x: 10.0, y: 5.0, cluster: 2 }, { x: 10.5, y: 4.5, cluster: 2 }, { x: 11.0, y: 4.0, cluster: 2 },
]

const clusterDistribution = [
  { name: 'Normal', value: 85, color: '#10b981' },
  { name: 'Retardataire', value: 10, color: '#f59e0b' },
  { name: 'Absent', value: 5, color: '#ef4444' },
]

const risqueColors = {
  FAIBLE: 'badge-info',
  MOYEN: 'badge-warning',
  ELEVE: 'badge-danger',
}

export default function IAPage() {
  const [anomalies] = useState(mockAnomalies)
  const [analysisRunning, setAnalysisRunning] = useState(false)

  const lancerAnalyse = () => {
    setAnalysisRunning(true)
    toast.loading('Analyse IA en cours...')
    setTimeout(() => {
      setAnalysisRunning(false)
      toast.dismiss()
      toast.success('Analyse terminée - 4 anomalies détectées')
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analyse IA</h1>
          <p className="text-gray-500 mt-1">Détection d'anomalies & segmentation des profils</p>
        </div>
        <button
          onClick={lancerAnalyse}
          disabled={analysisRunning}
          className="btn-primary flex items-center gap-2"
        >
          {analysisRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Analyse en cours...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Lancer l'analyse
            </>
          )}
        </button>
      </div>

      {/* Stats IA */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-50">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{anomalies.length}</p>
              <p className="text-xs text-gray-500">Anomalies détectées</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-yellow-50">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">5%</p>
              <p className="text-xs text-gray-500">Taux de contamination</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-50">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-500">Clusters K-Means</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-50">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-xs text-gray-500">Précision détection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scatter plot - Clusters */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Segmentation K-Means</h3>
          <p className="text-sm text-gray-500 mb-4">Heure d'arrivée vs Durée de travail</p>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="x" name="Arrivée" unit="h" stroke="#6b7280" fontSize={11} />
              <YAxis dataKey="y" name="Durée" unit="h" stroke="#6b7280" fontSize={11} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={mockClusterData}>
                {mockClusterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CLUSTER_COLORS[entry.cluster]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Retardataire</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Absent</span>
            </div>
          </div>
        </div>

        {/* Pie - Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Distribution des clusters</h3>
          <p className="text-sm text-gray-500 mb-4">Répartition des profils comportementaux</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={clusterDistribution}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {clusterDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Anomalies Table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Anomalies détectées (Isolation Forest)</h3>
          <p className="text-sm text-gray-500 mt-0.5">Score &gt; 0.5 = comportement anormal</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Employé</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Score</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Risque</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Cluster</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {anomalies.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{a.employe}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${a.score > 0.7 ? 'bg-red-500' : a.score > 0.5 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${a.score * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-mono">{a.score.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{a.type}</td>
                  <td className="px-6 py-4"><span className={risqueColors[a.risque]}>{a.risque}</span></td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CLUSTER_COLORS[a.cluster] }}></div>
                      Cluster {a.cluster}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
