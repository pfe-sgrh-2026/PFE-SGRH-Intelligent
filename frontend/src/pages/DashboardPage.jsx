import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Users, CalendarDays, Clock, AlertTriangle,
  TrendingUp, TrendingDown, ArrowUpRight
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

// Données de démonstration
const mockStats = {
  totalEmployes: 156,
  congesEnAttente: 12,
  presentsAujourdhui: 142,
  anomaliesDetectees: 7,
}

const congesParMois = [
  { mois: 'Jan', annuels: 12, maladie: 3, sansSolde: 1 },
  { mois: 'Fév', annuels: 8, maladie: 5, sansSolde: 2 },
  { mois: 'Mar', annuels: 15, maladie: 2, sansSolde: 0 },
  { mois: 'Avr', annuels: 10, maladie: 4, sansSolde: 1 },
  { mois: 'Mai', annuels: 18, maladie: 6, sansSolde: 3 },
  { mois: 'Jun', annuels: 22, maladie: 2, sansSolde: 1 },
]

const presencesSemaine = [
  { jour: 'Lun', presents: 148, retards: 8 },
  { jour: 'Mar', presents: 145, retards: 12 },
  { jour: 'Mer', presents: 150, retards: 5 },
  { jour: 'Jeu', presents: 142, retards: 15 },
  { jour: 'Ven', presents: 138, retards: 10 },
]

const repartitionDepartements = [
  { name: 'IT', value: 45 },
  { name: 'Finance', value: 28 },
  { name: 'Marketing', value: 22 },
  { name: 'RH', value: 15 },
  { name: 'Commercial', value: 46 },
]

const activiteRecente = [
  { id: 1, action: 'Demande de congé soumise', user: 'Ahmed Benali', time: 'Il y a 5 min', type: 'conge' },
  { id: 2, action: 'Anomalie détectée - retards fréquents', user: 'Karim Idrissi', time: 'Il y a 15 min', type: 'anomalie' },
  { id: 3, action: 'Document OCR traité', user: 'Sara Moussaid', time: 'Il y a 30 min', type: 'document' },
  { id: 4, action: 'Fiche de paie générée', user: 'Fatima Zahra', time: 'Il y a 1h', type: 'paie' },
  { id: 5, action: 'Pointage enregistré', user: 'Omar Tazi', time: 'Il y a 2h', type: 'presence' },
]

function StatCard({ title, value, icon: Icon, trend, trendValue, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-medium">{trendValue}</span>
              <span className="text-gray-400">vs mois dernier</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {user?.email?.split('@')[0]} !
        </h1>
        <p className="text-gray-500 mt-1">
          Voici un aperçu de votre système RH aujourd'hui.
        </p>
      </div>

      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
              Application réalisée par
            </p>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-gray-900 font-semibold">
              <span>MANSOUR Aymane</span>
              <span>FOUKOU Issa</span>
              <span>BADIA Salahedine</span>
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-sm text-gray-500">Sous l'encadrement du</p>
            <p className="text-lg font-bold text-gray-900">Professeur : Ichrak BENAMRI</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employés"
          value={mockStats.totalEmployes}
          icon={Users}
          trend="up"
          trendValue="+3.2%"
          color="blue"
        />
        <StatCard
          title="Congés en attente"
          value={mockStats.congesEnAttente}
          icon={CalendarDays}
          trend="down"
          trendValue="-8%"
          color="yellow"
        />
        <StatCard
          title="Présents aujourd'hui"
          value={mockStats.presentsAujourdhui}
          icon={Clock}
          trend="up"
          trendValue="+1.5%"
          color="green"
        />
        <StatCard
          title="Anomalies IA"
          value={mockStats.anomaliesDetectees}
          icon={AlertTriangle}
          trend="down"
          trendValue="-2"
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Congés par mois */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Congés par mois</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Voir tout
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={congesParMois}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mois" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="annuels" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Annuels" />
              <Bar dataKey="maladie" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Maladie" />
              <Bar dataKey="sansSolde" fill="#ef4444" radius={[4, 4, 0, 0]} name="Sans solde" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition départements */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Par département</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={repartitionDepartements}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {repartitionDepartements.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {repartitionDepartements.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                <span className="text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Présences semaine */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Présences cette semaine</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={presencesSemaine}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="jour" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              <Area type="monotone" dataKey="presents" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} name="Présents" />
              <Area type="monotone" dataKey="retards" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} name="Retards" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activité récente */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Activité récente</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Tout voir
            </button>
          </div>
          <div className="space-y-3">
            {activiteRecente.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.type === 'anomalie' ? 'bg-red-500' :
                  item.type === 'conge' ? 'bg-yellow-500' :
                  item.type === 'document' ? 'bg-blue-500' :
                  'bg-green-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{item.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.user} · {item.time}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
