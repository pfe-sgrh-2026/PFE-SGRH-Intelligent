import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Eye, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const mockDocuments = [
  { id: 1, nomFichier: 'certificat_medical_benali.pdf', typeDocument: 'Certificat médical', employe: 'Ahmed Benali', statut: 'TRAITE', texteExtrait: 'Certificat médical attestant que M. Ahmed Benali nécessite un repos de 3 jours...', dateUpload: '2025-05-15' },
  { id: 2, nomFichier: 'contrat_zahra.pdf', typeDocument: 'Contrat', employe: 'Fatima Zahra', statut: 'TRAITE', texteExtrait: 'Contrat de travail à durée indéterminée...', dateUpload: '2025-05-14' },
  { id: 3, nomFichier: 'attestation_idrissi.png', typeDocument: 'Attestation', employe: 'Karim Idrissi', statut: 'EN_COURS', texteExtrait: '', dateUpload: '2025-05-19' },
  { id: 4, nomFichier: 'diplome_moussaid.pdf', typeDocument: 'Diplôme', employe: 'Sara Moussaid', statut: 'ERREUR', texteExtrait: '', dateUpload: '2025-05-18' },
]

const statutConfig = {
  TRAITE: { label: 'Traité', class: 'badge-success', icon: CheckCircle },
  EN_COURS: { label: 'En cours', class: 'badge-warning', icon: FileText },
  ERREUR: { label: 'Erreur', class: 'badge-danger', icon: AlertCircle },
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [showUpload, setShowUpload] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleUpload = (e) => {
    e.preventDefault()
    toast.success('Document uploadé - OCR en cours...')
    setShowUpload(false)
  }

  const handleDelete = (doc) => {
    if (window.confirm(`Supprimer le document ${doc.nomFichier} ?`)) {
      setDocuments(documents.filter(d => d.id !== doc.id))
      if (selectedDoc?.id === doc.id) setSelectedDoc(null)
      toast.success('Document supprimé avec succès')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents & OCR</h1>
          <p className="text-gray-500 mt-1">Upload et extraction automatique de texte</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="btn-primary flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Uploader un document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-primary-600">{documents.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total documents</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-600">{documents.filter(d => d.statut === 'TRAITE').length}</p>
          <p className="text-sm text-gray-500 mt-1">OCR réussi</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-yellow-600">{documents.filter(d => d.statut === 'EN_COURS').length}</p>
          <p className="text-sm text-gray-500 mt-1">En traitement</p>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
            <div key={doc.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 truncate">{doc.nomFichier}</h3>
                    <span className={statutConfig[doc.statut].class}>{statutConfig[doc.statut].label}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{doc.typeDocument} · {doc.employe}</p>
                  <p className="text-xs text-gray-400 mt-1">Uploadé le {doc.dateUpload}</p>
                  {doc.texteExtrait && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 bg-gray-50 rounded-lg p-2">
                      {doc.texteExtrait}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedDoc(doc)} title="Visualiser" className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(doc)} title="Supprimer" className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Uploader un document</h2>
              <p className="text-sm text-gray-500 mt-1">Le texte sera extrait automatiquement par OCR (Tesseract)</p>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => setDragActive(false)}
              >
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Glissez un fichier ici ou</p>
                <label className="inline-block mt-2 text-sm text-primary-600 font-medium cursor-pointer hover:text-primary-700">
                  parcourir vos fichiers
                  <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                </label>
                <p className="text-xs text-gray-400 mt-2">PDF, PNG, JPG (max 10 Mo)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de document</label>
                <select className="input-field">
                  <option>Certificat médical</option>
                  <option>Contrat</option>
                  <option>Attestation</option>
                  <option>Diplôme</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowUpload(false)} className="btn-secondary flex-1">Annuler</button>
                <button type="submit" className="btn-primary flex-1">Uploader & Analyser</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Détail du document</h2>
              <button onClick={() => setSelectedDoc(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Fichier :</span> <span className="font-medium">{selectedDoc.nomFichier}</span></div>
                <div><span className="text-gray-500">Type :</span> <span className="font-medium">{selectedDoc.typeDocument}</span></div>
                <div><span className="text-gray-500">Employé :</span> <span className="font-medium">{selectedDoc.employe}</span></div>
                <div><span className="text-gray-500">Date :</span> <span className="font-medium">{selectedDoc.dateUpload}</span></div>
              </div>
              {selectedDoc.texteExtrait && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Texte extrait (OCR)</h4>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 border">
                    {selectedDoc.texteExtrait}
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => setSelectedDoc(null)} className="btn-secondary flex-1">Fermer</button>
                <button onClick={() => handleDelete(selectedDoc)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
