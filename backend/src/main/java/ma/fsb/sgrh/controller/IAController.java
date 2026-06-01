package ma.fsb.sgrh.controller;

import lombok.RequiredArgsConstructor;
import ma.fsb.sgrh.entity.Anomalie;
import ma.fsb.sgrh.repository.AnomalieRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ia")
@RequiredArgsConstructor
public class IAController {

    private final AnomalieRepository anomalieRepository;
    private final WebClient.Builder webClientBuilder;

    @Value("${ia.service.url}")
    private String iaServiceUrl;

    @PostMapping("/detect")
    public ResponseEntity<?> detectAnomalies() {
        try {
            Map response = webClientBuilder.build()
                    .post()
                    .uri(iaServiceUrl + "/detect")
                    .bodyValue(Map.of("data", List.of(), "contamination", 0.05))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Erreur de communication avec le microservice IA: " + e.getMessage()));
        }
    }

    @PostMapping("/cluster")
    public ResponseEntity<?> clusterProfiles() {
        try {
            Map response = webClientBuilder.build()
                    .post()
                    .uri(iaServiceUrl + "/cluster")
                    .bodyValue(Map.of("data", List.of(), "n_clusters", 3))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Erreur de communication avec le microservice IA: " + e.getMessage()));
        }
    }

    @GetMapping("/rapport")
    public ResponseEntity<?> getRapport() {
        try {
            Map response = webClientBuilder.build()
                    .get()
                    .uri(iaServiceUrl + "/rapport")
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Erreur: " + e.getMessage()));
        }
    }

    @GetMapping("/anomalies")
    public ResponseEntity<List<Anomalie>> getAnomalies() {
        return ResponseEntity.ok(anomalieRepository.findTop10ByOrderByDateDetectionDesc());
    }
}
