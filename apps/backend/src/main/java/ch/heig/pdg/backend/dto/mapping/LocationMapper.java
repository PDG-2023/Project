package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.LocationDTO;
import ch.heig.pdg.backend.entities.Location;
import ch.heig.pdg.backend.repositories.LocationRepository;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class LocationMapper extends AbstractDataMapper implements IDataTransferObjectManager<Location> {
    private final LocationRepository locationRepository;

    public LocationMapper(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public IDataTransferObject<Location> getDTO(Location location) {
        LocationDTO dto = new LocationDTO();
        dto.setId(location.getId());
        dto.setName(location.getName());
        dto.setDescription(location.getDescription());
        dto.setCreated(DateFormatUtil.dateToString(location.getCreatedAt()));
        dto.setUpdated(DateFormatUtil.dateToString(location.getUpdatedAt()));
        dto.setParentLocationId(this.idOrNull(location.getParent()));
        return dto;
    }

    @Override
    public Location createFromDTO(IDataTransferObject<Location> dto) {
        return this.updateFromDTO(new Location(), dto);
    }

    @Override
    public Location updateFromDTO(Location location, IDataTransferObject<Location> dto) {
        LocationDTO locationDTO = (LocationDTO) dto;
        location.setName(locationDTO.getName());
        location.setDescription(locationDTO.getDescription());
        if (locationDTO.getParentLocationId().isPresent()) {
            location.setParent(this.getEntityIfExists(
                    locationDTO.getParentLocationId().get(),
                    this.locationRepository
            ));
        }
        return location;
    }
}
