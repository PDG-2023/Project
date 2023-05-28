package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.MovementDTO;
import ch.heig.pdg.backend.entities.Movement;
import org.springframework.stereotype.Service;

@Service
public class MovementMapper implements IDataTransferObjectManager<Movement> {
    @Override
    public IDataTransferObject<Movement> getDTO(Movement movement) {
        MovementDTO dto = new MovementDTO();
        dto.setId(movement.getId());
        dto.setCreated(movement.getCreatedAt().toString());
        return dto;
    }

    @Override
    public Movement createFromDTO(IDataTransferObject<Movement> dto) {
        MovementDTO movementDTO = (MovementDTO) dto;
        Movement movement = new Movement();
        movement.setType(Movement.Type.valueOf(movementDTO.getMovementType()));
        return movement;
    }

    @Override
    public Movement updateFromDTO(Movement movement, IDataTransferObject<Movement> dto) {
        MovementDTO movementDTO = (MovementDTO) dto;
        movement.setType(Movement.Type.valueOf(movementDTO.getMovementType()));
        return movement;
    }
}
