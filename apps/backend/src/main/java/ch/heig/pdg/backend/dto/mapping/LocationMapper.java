package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.LocationDTO;
import ch.heig.pdg.backend.entities.Location;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class LocationMapper implements IDataTransferObjectManager<Location> {
    @Override
    public IDataTransferObject<Location> getDTO(Location location) {
        LocationDTO dto = new LocationDTO();
        dto.setId(location.getId());
        dto.setName(location.getName());
        dto.setDescription(location.getDescription());
        dto.setCreated(DateFormatUtil.dateToString(location.getCreatedAt()));
        dto.setUpdated(DateFormatUtil.dateToString(location.getUpdatedAt()));
        return dto;
    }

    @Override
    public Location createFromDTO(IDataTransferObject<Location> dto) {
        LocationDTO locationDTO = (LocationDTO) dto;
        Location location = new Location();
        location.setName(locationDTO.getName());
        location.setDescription(locationDTO.getDescription());
        return location;
    }

    @Override
    public Location updateFromDTO(Location location, IDataTransferObject<Location> dto) {
        LocationDTO locationDTO = (LocationDTO) dto;
        location.setName(locationDTO.getName());
        location.setDescription(locationDTO.getDescription());
        return location;
    }
}
