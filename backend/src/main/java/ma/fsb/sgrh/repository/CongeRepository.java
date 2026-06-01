package ma.fsb.sgrh.repository;

import ma.fsb.sgrh.entity.Conge;
import ma.fsb.sgrh.entity.StatutConge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CongeRepository extends JpaRepository<Conge, Long> {
    List<Conge> findByEmployeId(Long employeId);
    List<Conge> findByStatut(StatutConge statut);
    List<Conge> findByEmployeIdAndStatut(Long employeId, StatutConge statut);
}
