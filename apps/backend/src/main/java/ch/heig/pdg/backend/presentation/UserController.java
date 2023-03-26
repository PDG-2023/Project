package ch.heig.pdg.backend.presentation;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class UserController {
    @GetMapping("/")
    public ResponseEntity slash() {
        ExampleResponse r = new ExampleResponse(1, LocalDateTime.now());
        return ResponseEntity.ok(r);
    }

    @Data
    @AllArgsConstructor
    static class ExampleResponse {
        private int id;
        private LocalDateTime date;
    }
}
