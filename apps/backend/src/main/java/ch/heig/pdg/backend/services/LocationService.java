package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.LocationDTO;
import ch.heig.pdg.backend.dto.mapping.LocationMapper;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.entities.Location;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.repositories.LocationRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationService extends AbstractService {
    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;

    protected LocationService(InventoryRepository inventoryRepository, LocationRepository locationRepository, LocationMapper locationMapper) {
        super(inventoryRepository);
        this.locationRepository = locationRepository;
        this.locationMapper = locationMapper;
    }

    public LocationDTO addLocation(Integer inventoryId, LocationDTO locationDTO) {
        Inventory inventory = this.checkInventory(inventoryId);

        Location location = this.locationMapper.createFromDTO(locationDTO);
        location.setInventory(inventory);

        if (locationDTO.getParentLocationId().isPresent()) {
            location.setParent(this.getEntityIfExists(
                    locationDTO.getParentLocationId().get(),
                    this.locationRepository
            ));
        }

        return (LocationDTO) this.locationMapper.getDTO(
                this.locationRepository.save(location)
        );
    }

    public LocationDTO removeLocation(Integer id) {
        Location location = this.getEntityIfExists(id, this.locationRepository);
        this.locationRepository.deleteById(id);
        return (LocationDTO) this.locationMapper.getDTO(location);
    }

    public LocationDTO getLocation(Integer id) {
        return (LocationDTO) this.locationMapper.getDTO(
                this.getEntityIfExists(id, this.locationRepository)
        );
    }

    public List<LocationDTO> getLocations(Integer inventoryId, HugoSearchFilter<Location> filter) {
        this.checkInventory(inventoryId);
        return this.locationRepository
                .findByFilter(filter, inventoryId)
                .stream()
                .map(l -> (LocationDTO) this.locationMapper.getDTO(l))
                .collect(Collectors.toList());
    }

    public LocationDTO updateLocation(Integer id, LocationDTO locationDTO) {
        Location location = this.getEntityIfExists(id, this.locationRepository);

        if (locationDTO.getParentLocationId().isPresent()) {
            location.setParent(this.getEntityIfExists(
                    locationDTO.getParentLocationId().get(),
                    this.locationRepository
            ));
        }

        return (LocationDTO) this.locationMapper.getDTO(
                this.locationRepository.save(
                        this.locationMapper.updateFromDTO(location, locationDTO)
                )
        );
    }
}
