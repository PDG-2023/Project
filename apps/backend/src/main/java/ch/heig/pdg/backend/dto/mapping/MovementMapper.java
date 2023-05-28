package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.entities.Movement;

public class MovementMapper implements IDataTransferObjectManager<Movement> {
    @Override
    public IDataTransferObject<Movement> getDTO(Movement object) {
        return null;
    }

    @Override
    public Movement createFromDTO(IDataTransferObject<Movement> dto) {
        return null;
    }

    @Override
    public Movement updateFromDTO(Movement object, IDataTransferObject<Movement> dto) {
        return null;
    }
}
