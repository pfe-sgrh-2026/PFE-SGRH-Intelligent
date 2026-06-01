package ma.fsb.sgrh.controller;

import lombok.RequiredArgsConstructor;
import ma.fsb.sgrh.entity.Document;
import ma.fsb.sgrh.repository.DocumentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentRepository documentRepository;
    private static final String UPLOAD_DIR = "uploads/";

    @GetMapping
    public ResponseEntity<List<Document>> getAll() {
        return ResponseEntity.ok(documentRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getById(@PathVariable Long id) {
        return documentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/upload")
    public ResponseEntity<Document> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("employeId") Long employeId,
            @RequestParam(value = "typeDocument", defaultValue = "Autre") String typeDocument
    ) throws IOException {
        // Sauvegarder le fichier
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        Files.write(filePath, file.getBytes());

        // Créer le document en base
        Document document = Document.builder()
                .nomFichier(file.getOriginalFilename())
                .typeDocument(typeDocument)
                .cheminFichier(filePath.toString())
                .statut("EN_COURS")
                .build();

        Document saved = documentRepository.save(document);

        // TODO: Appeler Tesseract OCR de manière asynchrone
        // ocrService.extractText(saved);

        return ResponseEntity.ok(saved);
    }
}
