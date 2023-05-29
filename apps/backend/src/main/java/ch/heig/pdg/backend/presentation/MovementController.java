package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.dto.MovementDTO;
import ch.heig.pdg.backend.entities.Movement;
import ch.heig.pdg.backend.services.MovementService;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovementController extends AbstractController implements ch.heig.pdg.backend.api.MovementApi {
    private final MovementService movementService;
    public MovementController(HttpServletRequest httpServletRequest, MovementService movementService) {
        super(httpServletRequest);
        this.movementService = movementService;
    }

    @Override
    public ResponseEntity<MovementDTO> createMovement(MovementDTO movementDTO) {
        return new ResponseEntity<>(
                this.movementService.addMovement(movementDTO),
                HttpStatus.CREATED
        );
    }

    @Override
    public ResponseEntity<MovementDTO> deleteMovement(Integer id) {
        return new ResponseEntity<>(
                this.movementService.removeMovement(id),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<MovementDTO> getMovement(Integer id) {
        return new ResponseEntity<>(
                this.movementService.getMovement(id),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<List<MovementDTO>> getMovements() {
        HugoSearchFilter<Movement> filter = HugoSearchFilter.build(this.httpServletRequest);

        return new ResponseEntity<>(
                this.movementService.getMovements(filter),
                HttpStatus.OK
        );
    }
}
