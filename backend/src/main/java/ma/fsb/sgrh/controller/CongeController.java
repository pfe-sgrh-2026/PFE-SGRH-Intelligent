package ma.fsb.sgrh.controller;

import lombok.RequiredArgsConstructor;
import ma.fsb.sgrh.entity.Conge;
import ma.fsb.sgrh.entity.StatutConge;
import ma.fsb.sgrh.repository.CongeRepository;
import ma.fsb.sgrh.repository.EmployeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conges")
@RequiredArgsConstructor
public class CongeController {

    private final CongeRepository congeRepository;
    private final EmployeRepository employeRepository;

    @GetMapping
    public ResponseEntity<List<Conge>> getAll() {
        return ResponseEntity.ok(congeRepository.findAll());
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<List<Conge>> getByEmploye(@PathVariable Long employeId) {
        return ResponseEntity.ok(congeRepository.findByEmployeId(employeId));
    }

    @GetMapping("/en-attente")
    public ResponseEntity<List<Conge>> getEnAttente() {
        return ResponseEntity.ok(congeRepository.findByStatut(StatutConge.EN_ATTENTE));
    }

    @PostMapping
    public ResponseEntity<Conge> create(@RequestBody Conge conge) {
        conge.setStatut(StatutConge.EN_ATTENTE);
        return ResponseEntity.ok(congeRepository.save(conge));
    }

    @PutMapping("/{id}/valider")
    public ResponseEntity<Conge> valider(@PathVariable Long id) {
        return congeRepository.findById(id)
                .map(conge -> {
                    conge.setStatut(StatutConge.VALIDE);
                    // Décrémenter le solde congé
                    var employe = conge.getEmploye();
                    employe.setSoldeConge(employe.getSoldeConge() - conge.getNbJours());
                    employeRepository.save(employe);
                    return ResponseEntity.ok(congeRepository.save(conge));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/refuser")
    public ResponseEntity<Conge> refuser(@PathVariable Long id) {
        return congeRepository.findById(id)
                .map(conge -> {
                    conge.setStatut(StatutConge.REFUSE);
                    return ResponseEntity.ok(congeRepository.save(conge));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
