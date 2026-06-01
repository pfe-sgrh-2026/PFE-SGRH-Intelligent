package ma.fsb.sgrh.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "anomalie")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Anomalie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employe_id", nullable = false)
    private Employe employe;

    @Column(name = "score_isolation", nullable = false)
    private Double scoreIsolation;

    @Column(name = "type_anomalie", length = 100)
    private String typeAnomalie;

    @Column(name = "niveau_risque", nullable = false, length = 10)
    private String niveauRisque;

    @Column(name = "cluster_label")
    private Integer clusterLabel;

    @Column(name = "date_detection", nullable = false)
    @Builder.Default
    private LocalDateTime dateDetection = LocalDateTime.now();

    @Column(name = "description_ia", columnDefinition = "TEXT")
    private String descriptionIa;
}
