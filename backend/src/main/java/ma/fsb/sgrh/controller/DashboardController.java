package ma.fsb.sgrh.controller;

import lombok.RequiredArgsConstructor;
import ma.fsb.sgrh.entity.StatutConge;
import ma.fsb.sgrh.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final EmployeRepository employeRepository;
    private final CongeRepository congeRepository;
    private final PresenceRepository presenceRepository;
    private final AnomalieRepository anomalieRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long totalEmployes = employeRepository.count();
        long congesEnAttente = congeRepository.findByStatut(StatutConge.EN_ATTENTE).size();
        long presentsAujourdhui = presenceRepository.findByDatePresence(LocalDate.now()).size();
        long anomalies = anomalieRepository.count();

        return ResponseEntity.ok(Map.of(
                "totalEmployes", totalEmployes,
                "congesEnAttente", congesEnAttente,
                "presentsAujourdhui", presentsAujourdhui,
                "anomaliesDetectees", anomalies
        ));
    }
}
