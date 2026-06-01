package ma.fsb.sgrh.controller;

import lombok.RequiredArgsConstructor;
import ma.fsb.sgrh.entity.Employe;
import ma.fsb.sgrh.repository.EmployeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employes")
@RequiredArgsConstructor
public class EmployeController {

    private final EmployeRepository employeRepository;

    @GetMapping
    public ResponseEntity<List<Employe>> getAll() {
        return ResponseEntity.ok(employeRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employe> getById(@PathVariable Long id) {
        return employeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RH')")
    public ResponseEntity<Employe> create(@RequestBody Employe employe) {
        return ResponseEntity.ok(employeRepository.save(employe));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RH')")
    public ResponseEntity<Employe> update(@PathVariable Long id, @RequestBody Employe employe) {
        return employeRepository.findById(id)
                .map(existing -> {
                    existing.setNom(employe.getNom());
                    existing.setPrenom(employe.getPrenom());
                    existing.setPoste(employe.getPoste());
                    existing.setDepartement(employe.getDepartement());
                    existing.setSalaire(employe.getSalaire());
                    existing.setSoldeConge(employe.getSoldeConge());
                    return ResponseEntity.ok(employeRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (employeRepository.existsById(id)) {
            employeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
