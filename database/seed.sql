-- ============================================================
-- SGRH Intelligent - Données de test (Seed)
-- ============================================================

USE sgrh_intelligent;

-- ── Utilisateurs (mot de passe BCrypt pour "password123") ─────
INSERT INTO utilisateur (email, mot_de_passe, role, actif) VALUES
('admin@sgrh.ma', '$2a$10$N9qo8uLOickgx2ZMRZoMye1dXRa3IWczPBjKjQz3VHm1BJ6Iqx8Hy', 'ADMIN', TRUE),
('rh@sgrh.ma', '$2a$10$N9qo8uLOickgx2ZMRZoMye1dXRa3IWczPBjKjQz3VHm1BJ6Iqx8Hy', 'RH', TRUE),
('ahmed.benali@sgrh.ma', '$2a$10$N9qo8uLOickgx2ZMRZoMye1dXRa3IWczPBjKjQz3VHm1BJ6Iqx8Hy', 'EMPLOYE', TRUE),
('fatima.zahra@sgrh.ma', '$2a$10$N9qo8uLOickgx2ZMRZoMye1dXRa3IWczPBjKjQz3VHm1BJ6Iqx8Hy', 'EMPLOYE', TRUE),
('karim.idrissi@sgrh.ma', '$2a$10$N9qo8uLOickgx2ZMRZoMye1dXRa3IWczPBjKjQz3VHm1BJ6Iqx8Hy', 'EMPLOYE', TRUE),
('sara.moussaid@sgrh.ma', '$2a$10$N9qo8uLOickgx2ZMRZoMye1dXRa3IWczPBjKjQz3VHm1BJ6Iqx8Hy', 'EMPLOYE', TRUE),
('omar.tazi@sgrh.ma', '$2a$10$N9qo8uLOickgx2ZMRZoMye1dXRa3IWczPBjKjQz3VHm1BJ6Iqx8Hy', 'EMPLOYE', TRUE);

-- ── Employés ──────────────────────────────────────────────────
INSERT INTO employe (utilisateur_id, matricule, nom, prenom, poste, departement, salaire, solde_conge, date_embauche) VALUES
(2, 'RH-001', 'Responsable', 'RH', 'Responsable RH', 'Ressources Humaines', 15000.00, 22, '2020-01-15'),
(3, 'EMP-001', 'Benali', 'Ahmed', 'Développeur Full-Stack', 'IT', 12000.00, 18, '2022-03-01'),
(4, 'EMP-002', 'Zahra', 'Fatima', 'Designer UI/UX', 'IT', 11000.00, 15, '2021-06-15'),
(5, 'EMP-003', 'Idrissi', 'Karim', 'Comptable', 'Finance', 10000.00, 20, '2019-09-01'),
(6, 'EMP-004', 'Moussaid', 'Sara', 'Chargée Marketing', 'Marketing', 9500.00, 18, '2023-01-10'),
(7, 'EMP-005', 'Tazi', 'Omar', 'Technicien Réseau', 'IT', 8500.00, 12, '2023-07-01');

-- ── Congés ────────────────────────────────────────────────────
INSERT INTO conge (employe_id, date_debut, date_fin, nb_jours, type_conge, statut, motif) VALUES
(2, '2025-07-01', '2025-07-05', 5, 'ANNUEL', 'VALIDE', 'Vacances familiales'),
(3, '2025-06-10', '2025-06-12', 3, 'MALADIE', 'VALIDE', 'Grippe saisonnière'),
(4, '2025-08-01', '2025-08-10', 8, 'ANNUEL', 'EN_ATTENTE', 'Voyage personnel'),
(5, '2025-05-20', '2025-05-22', 3, 'SANS_SOLDE', 'REFUSE', 'Raison personnelle'),
(6, '2025-09-15', '2025-09-17', 3, 'ANNUEL', 'EN_ATTENTE', 'Événement familial');

-- ── Présences (semaine type) ──────────────────────────────────
INSERT INTO presence (employe_id, date_presence, heure_arrivee, heure_depart, est_en_retard) VALUES
(2, '2025-05-12', '08:00:00', '17:00:00', FALSE),
(2, '2025-05-13', '08:05:00', '17:00:00', FALSE),
(2, '2025-05-14', '08:00:00', '17:30:00', FALSE),
(3, '2025-05-12', '08:30:00', '17:00:00', TRUE),
(3, '2025-05-13', '09:15:00', '17:00:00', TRUE),
(3, '2025-05-14', '08:00:00', '16:30:00', FALSE),
(4, '2025-05-12', '08:00:00', '17:00:00', FALSE),
(4, '2025-05-13', '08:00:00', '17:00:00', FALSE),
(5, '2025-05-12', '07:55:00', '17:00:00', FALSE),
(5, '2025-05-13', '10:00:00', '17:00:00', TRUE),
(6, '2025-05-12', '08:45:00', '17:00:00', TRUE),
(6, '2025-05-13', '08:00:00', '17:00:00', FALSE);

-- ── Fiches de paie (Mai 2025) ─────────────────────────────────
INSERT INTO fiche_paie (employe_id, mois, annee, salaire_base, salaire_net) VALUES
(2, 5, 2025, 12000.00, 9840.00),
(3, 5, 2025, 11000.00, 9020.00),
(4, 5, 2025, 10000.00, 8200.00),
(5, 5, 2025, 9500.00, 7790.00),
(6, 5, 2025, 8500.00, 6970.00);
