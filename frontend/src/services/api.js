import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sgrh_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepteur pour gérer les erreurs 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sgrh_user')
      localStorage.removeItem('sgrh_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ── Auth ──────────────────────────────────────────────
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
}

// ── Employés ──────────────────────────────────────────
export const employeService = {
  getAll: () => api.get('/employes'),
  getById: (id) => api.get(`/employes/${id}`),
  create: (data) => api.post('/employes', data),
  update: (id, data) => api.put(`/employes/${id}`, data),
  delete: (id) => api.delete(`/employes/${id}`),
}

// ── Congés ────────────────────────────────────────────
export const congeService = {
  getAll: () => api.get('/conges'),
  getByEmploye: (employeId) => api.get(`/conges/employe/${employeId}`),
  create: (data) => api.post('/conges', data),
  valider: (id) => api.put(`/conges/${id}/valider`),
  refuser: (id) => api.put(`/conges/${id}/refuser`),
}

// ── Présences ─────────────────────────────────────────
export const presenceService = {
  getAll: () => api.get('/presences'),
  getByEmploye: (employeId) => api.get(`/presences/employe/${employeId}`),
  pointer: (data) => api.post('/presences', data),
}

// ── Paie ──────────────────────────────────────────────
export const paieService = {
  getAll: () => api.get('/fiches-paie'),
  getByEmploye: (employeId) => api.get(`/fiches-paie/employe/${employeId}`),
  generer: (data) => api.post('/fiches-paie/generer', data),
}

// ── Documents ─────────────────────────────────────────
export const documentService = {
  getAll: () => api.get('/documents'),
  upload: (formData) => api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getById: (id) => api.get(`/documents/${id}`),
}

// ── IA ────────────────────────────────────────────────
export const iaService = {
  detecterAnomalies: () => api.post('/ia/detect'),
  segmenter: () => api.post('/ia/cluster'),
  getRapport: () => api.get('/ia/rapport'),
  getAnomalies: () => api.get('/ia/anomalies'),
}

// ── Dashboard ─────────────────────────────────────────
export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
}

export default api
