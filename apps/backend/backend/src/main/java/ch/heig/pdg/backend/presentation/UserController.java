package ch.heig.pdg.backend.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @GetMapping("/")
    public ResponseEntity slash() {
        return ResponseEntity.ok().build();
    }
}
