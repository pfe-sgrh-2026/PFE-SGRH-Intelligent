-- ============================================================
-- SGRH Intelligent - Schéma de Base de Données MySQL 8
-- Conforme à la loi marocaine 09-08 (protection des données)
-- ============================================================

CREATE DATABASE IF NOT EXISTS sgrh_intelligent
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sgrh_intelligent;

-- ── Table Utilisateur ─────────────────────────────────────────
CREATE TABLE utilisateur (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(150) NOT NULL UNIQUE,
  mot_de_passe  VARCHAR(255) NOT NULL,
  role          ENUM('ADMIN', 'RH', 'EMPLOYE') NOT NULL DEFAULT 'EMPLOYE',
  actif         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Table Employé ─────────────────────────────────────────────
CREATE TABLE employe (
  id             BIGINT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id BIGINT NOT NULL UNIQUE,
  matricule      VARCHAR(20) NOT NULL UNIQUE,
  nom            VARCHAR(100) NOT NULL,
  prenom         VARCHAR(100) NOT NULL,
  poste          VARCHAR(100),
  departement    VARCHAR(100),
  salaire        DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  solde_conge    INT NOT NULL DEFAULT 18,
  date_embauche  DATE,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_employe_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Table Congé ───────────────────────────────────────────────
CREATE TABLE conge (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  employe_id  BIGINT NOT NULL,
  date_debut  DATE NOT NULL,
  date_fin    DATE NOT NULL,
  nb_jours    INT NOT NULL,
  type_conge  ENUM('ANNUEL', 'MALADIE', 'SANS_SOLDE') NOT NULL DEFAULT 'ANNUEL',
  statut      ENUM('EN_ATTENTE', 'VALIDE', 'REFUSE') NOT NULL DEFAULT 'EN_ATTENTE',
  motif       TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_conge_employe FOREIGN KEY (employe_id) REFERENCES employe(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Table Présence ────────────────────────────────────────────
CREATE TABLE presence (
  id             BIGINT AUTO_INCREMENT PRIMARY KEY,
  employe_id     BIGINT NOT NULL,
  date_presence  DATE NOT NULL,
  heure_arrivee  TIME,
  heure_depart   TIME,
  est_en_retard  BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_presence_employe FOREIGN KEY (employe_id) REFERENCES employe(id) ON DELETE CASCADE,
  UNIQUE KEY uk_presence_employe_date (employe_id, date_presence)
) ENGINE=InnoDB;

-- ── Table Fiche de Paie ───────────────────────────────────────
CREATE TABLE fiche_paie (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  employe_id    BIGINT NOT NULL,
  mois          TINYINT NOT NULL CHECK (mois BETWEEN 1 AND 12),
  annee         SMALLINT NOT NULL,
  salaire_base  DECIMAL(10,2) NOT NULL,
  salaire_net   DECIMAL(10,2) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_fiche_paie_employe FOREIGN KEY (employe_id) REFERENCES employe(id) ON DELETE CASCADE,
  UNIQUE KEY uk_fiche_paie_employe_mois (employe_id, mois, annee)
) ENGINE=InnoDB;

-- ── Table Document ────────────────────────────────────────────
CREATE TABLE document (
  id             BIGINT AUTO_INCREMENT PRIMARY KEY,
  employe_id     BIGINT NOT NULL,
  nom_fichier    VARCHAR(255) NOT NULL,
  type_document  VARCHAR(50),
  chemin_fichier VARCHAR(500),
  texte_extrait  LONGTEXT,
  statut         ENUM('EN_COURS', 'TRAITE', 'ERREUR') DEFAULT 'EN_COURS',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_document_employe FOREIGN KEY (employe_id) REFERENCES employe(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Table Anomalie ────────────────────────────────────────────
CREATE TABLE anomalie (
  id               BIGINT AUTO_INCREMENT PRIMARY KEY,
  employe_id       BIGINT NOT NULL,
  score_isolation  DOUBLE NOT NULL,
  type_anomalie    VARCHAR(100),
  niveau_risque    ENUM('FAIBLE', 'MOYEN', 'ELEVE') NOT NULL DEFAULT 'MOYEN',
  cluster_label    INT,
  date_detection   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  description_ia   TEXT,
  CONSTRAINT fk_anomalie_employe FOREIGN KEY (employe_id) REFERENCES employe(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Index de performance ──────────────────────────────────────
CREATE INDEX idx_conge_employe_statut ON conge(employe_id, statut);
CREATE INDEX idx_presence_date ON presence(date_presence);
CREATE INDEX idx_anomalie_risque ON anomalie(niveau_risque, date_detection);
CREATE INDEX idx_employe_departement ON employe(departement);
