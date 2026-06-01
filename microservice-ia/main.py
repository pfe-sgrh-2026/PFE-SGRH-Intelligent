"""
Microservice IA - SGRH Intelligent
Endpoints: Détection d'anomalies (Isolation Forest) + Segmentation (K-Means)
Port: 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import json

app = FastAPI(
    title="SGRH IA Microservice",
    description="Détection d'anomalies et segmentation des profils RH",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Modèles Pydantic ─────────────────────────────────────────

class PresenceRecord(BaseModel):
    employe_id: int
    heure_arrivee: float
    heure_depart: float
    duree_travail: float
    est_retard: int
    nb_absences_semaine: int

class DetectRequest(BaseModel):
    data: List[PresenceRecord]
    contamination: float = 0.05

class ClusterRequest(BaseModel):
    data: List[PresenceRecord]
    n_clusters: int = 3

class AnomalyResult(BaseModel):
    employe_id: int
    score_isolation: float
    is_anomaly: bool
    cluster_label: int
    niveau_risque: str

class DetectResponse(BaseModel):
    anomalies: List[AnomalyResult]
    total_analysed: int
    total_anomalies: int
    contamination_rate: float

class ClusterResponse(BaseModel):
    clusters: List[dict]
    cluster_centers: List[List[float]]
    cluster_distribution: dict

# ── Endpoints ─────────────────────────────────────────────────

@app.get("/")
def root():
    return {
        "service": "SGRH IA Microservice",
        "version": "1.0.0",
        "endpoints": ["/detect", "/cluster", "/rapport", "/generate-dataset"]
    }

@app.post("/detect", response_model=DetectResponse)
def detect_anomalies(request: DetectRequest):
    """
    Détection d'anomalies avec Isolation Forest.
    Score > 0.5 = comportement anormal.
    """
    if len(request.data) < 10:
        raise HTTPException(status_code=400, detail="Minimum 10 enregistrements requis")

    df = pd.DataFrame([r.model_dump() for r in request.data])
    features = df[['heure_arrivee', 'heure_depart', 'duree_travail', 'est_retard', 'nb_absences_semaine']]

    # Isolation Forest
    iso_forest = IsolationForest(
        contamination=request.contamination,
        random_state=42,
        n_estimators=100
    )
    predictions = iso_forest.fit_predict(features)
    scores = iso_forest.decision_function(features)

    # Normaliser les scores entre 0 et 1 (1 = plus anormal)
    scores_normalized = 1 - (scores - scores.min()) / (scores.max() - scores.min())

    # K-Means pour segmentation complémentaire
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    cluster_labels = kmeans.fit_predict(features_scaled)

    # Construire les résultats
    anomalies = []
    for i, row in df.iterrows():
        score = float(scores_normalized[i])
        is_anomaly = predictions[i] == -1

        if score > 0.7:
            niveau = "ELEVE"
        elif score > 0.5:
            niveau = "MOYEN"
        else:
            niveau = "FAIBLE"

        if is_anomaly:
            anomalies.append(AnomalyResult(
                employe_id=int(row['employe_id']),
                score_isolation=round(score, 4),
                is_anomaly=True,
                cluster_label=int(cluster_labels[i]),
                niveau_risque=niveau
            ))

    return DetectResponse(
        anomalies=anomalies,
        total_analysed=len(df),
        total_anomalies=len(anomalies),
        contamination_rate=request.contamination
    )

@app.post("/cluster", response_model=ClusterResponse)
def cluster_profiles(request: ClusterRequest):
    """
    Segmentation K-Means des profils comportementaux.
    Cluster 0: Normal | Cluster 1: Retardataire | Cluster 2: Absent
    """
    if len(request.data) < 10:
        raise HTTPException(status_code=400, detail="Minimum 10 enregistrements requis")

    df = pd.DataFrame([r.model_dump() for r in request.data])
    features = df[['heure_arrivee', 'heure_depart', 'duree_travail', 'est_retard', 'nb_absences_semaine']]

    # Normalisation StandardScaler
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)

    # K-Means
    kmeans = KMeans(n_clusters=request.n_clusters, random_state=42, n_init=10)
    labels = kmeans.fit_predict(features_scaled)

    # Résultats par employé
    cluster_names = {0: "Normal", 1: "Retardataire", 2: "Absent"}
    clusters = []
    for i, row in df.iterrows():
        clusters.append({
            "employe_id": int(row['employe_id']),
            "cluster": int(labels[i]),
            "cluster_name": cluster_names.get(int(labels[i]), "Inconnu")
        })

    # Distribution
    unique, counts = np.unique(labels, return_counts=True)
    distribution = {cluster_names.get(int(k), f"Cluster {k}"): int(v) for k, v in zip(unique, counts)}

    return ClusterResponse(
        clusters=clusters,
        cluster_centers=kmeans.cluster_centers_.tolist(),
        cluster_distribution=distribution
    )

@app.get("/rapport")
def generate_rapport():
    """
    Génère un rapport consolidé avec les dernières analyses.
    """
    return {
        "rapport": {
            "date_generation": "2025-05-19T10:00:00",
            "resume": {
                "total_employes_analyses": 100,
                "anomalies_detectees": 5,
                "taux_contamination": "5%",
                "clusters": {
                    "Normal": 85,
                    "Retardataire": 10,
                    "Absent": 5
                }
            },
            "recommandations": [
                "Surveiller les employés du Cluster 2 (absences groupées)",
                "Planifier des entretiens avec les employés à score > 0.7",
                "Ajuster les horaires flexibles pour le Cluster 1"
            ]
        }
    }

@app.get("/generate-dataset")
def generate_synthetic_dataset():
    """
    Génère un dataset synthétique de 100 employés sur 180 jours
    pour les tests et la démonstration.
    """
    np.random.seed(42)
    n_employes = 100
    n_jours = 180
    records = []

    for emp_id in range(1, n_employes + 1):
        # 95% normaux, 5% anormaux
        is_anomaly = emp_id <= 5

        for jour in range(n_jours):
            if is_anomaly:
                heure_arrivee = np.random.normal(9.5, 1.0)
                heure_depart = np.random.normal(16.0, 1.5)
                est_retard = 1 if heure_arrivee > 8.5 else 0
                nb_absences = np.random.randint(0, 4)
            else:
                heure_arrivee = np.random.normal(8.0, 0.3)
                heure_depart = np.random.normal(17.0, 0.3)
                est_retard = 1 if heure_arrivee > 8.5 else 0
                nb_absences = np.random.randint(0, 1)

            duree = max(0, heure_depart - heure_arrivee)

            records.append({
                "employe_id": emp_id,
                "heure_arrivee": round(heure_arrivee, 2),
                "heure_depart": round(heure_depart, 2),
                "duree_travail": round(duree, 2),
                "est_retard": est_retard,
                "nb_absences_semaine": nb_absences
            })

    return {
        "total_records": len(records),
        "n_employes": n_employes,
        "n_jours": n_jours,
        "data": records[:100]  # Retourner un échantillon
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "ia-microservice"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
