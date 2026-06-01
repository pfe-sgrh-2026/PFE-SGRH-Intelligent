package ma.fsb.sgrh.repository;

import ma.fsb.sgrh.entity.Presence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PresenceRepository extends JpaRepository<Presence, Long> {
    List<Presence> findByEmployeId(Long employeId);
    List<Presence> findByDatePresence(LocalDate date);
    List<Presence> findByEmployeIdAndDatePresenceBetween(Long employeId, LocalDate debut, LocalDate fin);
    long countByDatePresenceAndEstEnRetardTrue(LocalDate date);
}
