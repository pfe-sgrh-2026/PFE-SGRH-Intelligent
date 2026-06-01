# SGRH Intelligent - Système de Gestion des Ressources Humaines

> Projet de Fin d'Études - L3 Développement Informatique 2025-2026  
> Université Hassan II - Faculté des Sciences Ben M'Sick

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│    Backend       │────▶│  Microservice   │
│   React JS      │     │  Spring Boot     │     │   IA (FastAPI)  │
│   Port 3000     │     │   Port 8080      │     │   Port 8000     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │                         │
                               ▼                         │
                        ┌──────────────┐                 │
                        │   MySQL 8    │                 │
                        │  Port 3306   │                 │
                        └──────────────┘                 │
                               │                         │
                               ▼                         │
                        ┌──────────────┐                 │
                        │ Tesseract OCR│◀────────────────┘
                        └──────────────┘
```

## Structure du projet

```
PFE_Slah/
├── frontend/              # React JS + Vite + TailwindCSS
├── backend/               # Spring Boot 3.x + Java 21
├── microservice-ia/       # FastAPI + scikit-learn
├── database/              # Scripts SQL (schema + seed)
├── 01 use case v2.puml    # Diagramme de cas d'utilisation
├── 03 classes v2.puml     # Diagramme de classes
├── 04 architecture v2.puml # Diagramme d'architecture
└── README.md
```

## Prérequis

- **Node.js** >= 18.x
- **Java** 21 (JDK)
- **Python** 3.11+
- **MySQL** 8.x
- **Tesseract OCR** 5.x (optionnel pour l'OCR)

## Démarrage rapide

### 1. Base de données
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 2. Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
# Accessible sur http://localhost:8080
```

### 3. Microservice IA (FastAPI)
```bash
cd microservice-ia
pip install -r requirements.txt
python main.py
# Accessible sur http://localhost:8000
# Documentation: http://localhost:8000/docs
```

### 4. Frontend (React)
```bash
cd frontend
npm install
npm run dev
# Accessible sur http://localhost:3000
```

## Comptes de démonstration

| Email | Mot de passe | Rôle |
|-------|-------------|------|
| admin@sgrh.ma | password123 | ADMIN |
| rh@sgrh.ma | password123 | RH |
| ahmed.benali@sgrh.ma | password123 | EMPLOYE |

## Technologies

| Couche | Technologie | Version |
|--------|-------------|---------|
| Frontend | React + Vite + TailwindCSS | 18.x |
| Backend | Spring Boot + Spring Security | 3.2.x |
| IA | FastAPI + scikit-learn | Python 3.11 |
| BDD | MySQL | 8.x |
| OCR | Tesseract | 5.x |
| Auth | JWT (jjwt) | 0.12.x |

## Fonctionnalités

- **Authentification JWT** avec rôles (ADMIN, RH, EMPLOYE)
- **Gestion des employés** (CRUD complet)
- **Gestion des congés** (soumission, validation, refus)
- **Suivi des présences** (pointage, détection retards)
- **Gestion de la paie** (fiches de paie mensuelles)
- **Analyse IA** : Isolation Forest (anomalies) + K-Means (segmentation)
- **OCR** : Extraction automatique de texte (Tesseract)
- **Dashboard interactif** avec graphiques temps réel
