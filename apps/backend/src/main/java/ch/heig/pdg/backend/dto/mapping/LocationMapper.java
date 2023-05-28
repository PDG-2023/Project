package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.entities.Location;
import org.springframework.stereotype.Service;

@Service
public class LocationMapper implements IDataTransferObjectManager<Location> {
    @Override
    public IDataTransferObject<Location> getDTO(Location object) {
        return null;
    }

    @Override
    public Location createFromDTO(IDataTransferObject<Location> dto) {
        return null;
    }

    @Override
    public Location updateFromDTO(Location object, IDataTransferObject<Location> dto) {
        return null;
    }
}
