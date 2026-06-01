package ma.fsb.sgrh.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "employe")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "utilisateur_id", nullable = false, unique = true)
    private Utilisateur utilisateur;

    @Column(unique = true, nullable = false, length = 20)
    private String matricule;

    @Column(nullable = false, length = 100)
    private String nom;

    @Column(nullable = false, length = 100)
    private String prenom;

    @Column(length = 100)
    private String poste;

    @Column(length = 100)
    private String departement;

    @Column(nullable = false)
    private Double salaire = 0.0;

    @Column(name = "solde_conge", nullable = false)
    private Integer soldeConge = 18;

    @Column(name = "date_embauche")
    private LocalDate dateEmbauche;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "employe", cascade = CascadeType.ALL)
    private List<Conge> conges;

    @OneToMany(mappedBy = "employe", cascade = CascadeType.ALL)
    private List<Presence> presences;

    @OneToMany(mappedBy = "employe", cascade = CascadeType.ALL)
    private List<FichePaie> fichesPaie;

    @OneToMany(mappedBy = "employe", cascade = CascadeType.ALL)
    private List<Document> documents;

    @OneToMany(mappedBy = "employe", cascade = CascadeType.ALL)
    private List<Anomalie> anomalies;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
