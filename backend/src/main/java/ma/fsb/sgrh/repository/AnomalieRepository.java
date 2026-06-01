package ma.fsb.sgrh.repository;

import ma.fsb.sgrh.entity.Anomalie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnomalieRepository extends JpaRepository<Anomalie, Long> {
    List<Anomalie> findByEmployeId(Long employeId);
    List<Anomalie> findByNiveauRisque(String niveauRisque);
    List<Anomalie> findTop10ByOrderByDateDetectionDesc();
}
