package ma.fsb.sgrh.controller;

import lombok.RequiredArgsConstructor;
import ma.fsb.sgrh.entity.Presence;
import ma.fsb.sgrh.repository.PresenceRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/presences")
@RequiredArgsConstructor
public class PresenceController {

    private final PresenceRepository presenceRepository;

    @GetMapping
    public ResponseEntity<List<Presence>> getAll() {
        return ResponseEntity.ok(presenceRepository.findAll());
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<List<Presence>> getByEmploye(@PathVariable Long employeId) {
        return ResponseEntity.ok(presenceRepository.findByEmployeId(employeId));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Presence>> getByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(presenceRepository.findByDatePresence(date));
    }

    @PostMapping
    public ResponseEntity<Presence> pointer(@RequestBody Presence presence) {
        // Déterminer si en retard (après 08:30)
        if (presence.getHeureArrivee() != null) {
            LocalTime limiteRetard = LocalTime.of(8, 30);
            presence.setEstEnRetard(presence.getHeureArrivee().isAfter(limiteRetard));
        }
        return ResponseEntity.ok(presenceRepository.save(presence));
    }
}
