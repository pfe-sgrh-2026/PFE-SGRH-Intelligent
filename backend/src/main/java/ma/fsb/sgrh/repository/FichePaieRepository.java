package ma.fsb.sgrh.repository;

import ma.fsb.sgrh.entity.FichePaie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FichePaieRepository extends JpaRepository<FichePaie, Long> {
    List<FichePaie> findByEmployeId(Long employeId);
    List<FichePaie> findByMoisAndAnnee(Integer mois, Integer annee);
}
