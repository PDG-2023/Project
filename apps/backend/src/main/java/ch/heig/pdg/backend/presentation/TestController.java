package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.api.DefaultApi;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
public class TestController implements ch.heig.pdg.api.DefaultApi {
    @Override
    public ResponseEntity<Void> exampleGet() {
        return DefaultApi.super.exampleGet();
    }
}
