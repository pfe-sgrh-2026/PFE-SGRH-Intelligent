package ma.fsb.sgrh.repository;

import ma.fsb.sgrh.entity.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeRepository extends JpaRepository<Employe, Long> {
    Optional<Employe> findByMatricule(String matricule);
    Optional<Employe> findByUtilisateurId(Long utilisateurId);
    List<Employe> findByDepartement(String departement);
    boolean existsByMatricule(String matricule);
}
