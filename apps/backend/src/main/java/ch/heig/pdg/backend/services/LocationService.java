package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.LocationDTO;
import ch.heig.pdg.backend.dto.mapping.LocationMapper;
import ch.heig.pdg.backend.entities.Category;
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

        return (LocationDTO) this.locationMapper.getDTO(
                this.locationRepository.save(location)
        );
    }

    public List<LocationDTO> search(Integer inventoryId, String searchTerm) {
        return this.locationRepository
                .search(inventoryId, searchTerm)
                .stream()
                .map(l -> (LocationDTO) this.locationMapper.getDTO(l))
                .collect(Collectors.toList());
    }

    public LocationDTO removeLocation(Integer id) {
        LocationDTO locationDTO = (LocationDTO) this.locationMapper.getDTO(this.getEntityIfExists(id, this.locationRepository));
        this.locationRepository.deleteById(id);
        return locationDTO;
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

    public Integer getLocationsCount(Integer inventoryId, HugoSearchFilter<Location> filter) {
        this.checkInventory(inventoryId);

        return this.locationRepository.count(filter, inventoryId);
    }

    public LocationDTO updateLocation(Integer id, LocationDTO locationDTO) {
        return (LocationDTO) this.locationMapper.getDTO(
                this.locationRepository.save(
                        this.locationMapper.updateFromDTO(
                                this.getEntityIfExists(id, this.locationRepository),
                                locationDTO
                        )
                )
        );
    }
}
