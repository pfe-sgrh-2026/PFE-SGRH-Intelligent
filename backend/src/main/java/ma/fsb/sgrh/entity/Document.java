package ma.fsb.sgrh.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "document")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employe_id", nullable = false)
    private Employe employe;

    @Column(name = "nom_fichier", nullable = false)
    private String nomFichier;

    @Column(name = "type_document", length = 50)
    private String typeDocument;

    @Column(name = "chemin_fichier", length = 500)
    private String cheminFichier;

    @Column(name = "texte_extrait", columnDefinition = "LONGTEXT")
    private String texteExtrait;

    @Column(length = 20)
    @Builder.Default
    private String statut = "EN_COURS";

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
