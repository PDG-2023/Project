package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.MovementDTO;
import ch.heig.pdg.backend.entities.Item;
import ch.heig.pdg.backend.entities.Location;
import ch.heig.pdg.backend.entities.Movement;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class MovementMapper extends AbstractDataMapper implements IDataTransferObjectManager<Movement> {

    @Override
    public IDataTransferObject<Movement> getDTO(Movement movement) {
        MovementDTO dto = new MovementDTO();
        dto.setId(movement.getId());
        dto.setCreated(DateFormatUtil.dateToString(movement.getCreatedAt()));
        dto.setLocationId(movement.getLocation().getId());
        dto.setMovementType(movement.getType().name());
        return dto;
    }

    @Override
    public Movement createFromDTO(IDataTransferObject<Movement> dto) {
        return this.updateFromDTO(new Movement(), dto);
    }

    @Override
    public Movement updateFromDTO(Movement movement, IDataTransferObject<Movement> dto) {
        MovementDTO movementDTO = (MovementDTO) dto;
        movement.setType(Movement.Type.valueOf(movementDTO.getMovementType()));
        movement.setLocation(this.entityManager.getReference(Location.class, movementDTO.getLocationId()));
        movement.setItem(this.entityManager.getReference(Item.class, movementDTO.getItemId()));
        return movement;
    }
}
