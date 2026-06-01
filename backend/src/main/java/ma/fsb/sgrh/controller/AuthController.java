package ma.fsb.sgrh.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.fsb.sgrh.dto.AuthRequest;
import ma.fsb.sgrh.dto.AuthResponse;
import ma.fsb.sgrh.entity.Role;
import ma.fsb.sgrh.entity.Utilisateur;
import ma.fsb.sgrh.repository.UtilisateurRepository;
import ma.fsb.sgrh.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UtilisateurRepository utilisateurRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getMotDePasse())
        );

        Utilisateur user = utilisateurRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        String token = jwtService.generateToken(
                Map.of("role", user.getRole().name()),
                user
        );

        return ResponseEntity.ok(AuthResponse.builder()
                .token(token)
                .user(AuthResponse.UserDto.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .build())
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody AuthRequest request) {
        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().build();
        }

        Utilisateur user = Utilisateur.builder()
                .email(request.getEmail())
                .motDePasse(passwordEncoder.encode(request.getMotDePasse()))
                .role(Role.EMPLOYE)
                .actif(true)
                .build();

        utilisateurRepository.save(user);

        String token = jwtService.generateToken(
                Map.of("role", user.getRole().name()),
                user
        );

        return ResponseEntity.ok(AuthResponse.builder()
                .token(token)
                .user(AuthResponse.UserDto.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .build())
                .build());
    }
}
