package ma.fsb.sgrh.repository;

import ma.fsb.sgrh.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByEmployeId(Long employeId);
    List<Document> findByStatut(String statut);
}
