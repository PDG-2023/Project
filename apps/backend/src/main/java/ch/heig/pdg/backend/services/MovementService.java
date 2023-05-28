package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.MovementDTO;
import ch.heig.pdg.backend.dto.mapping.MovementMapper;
import ch.heig.pdg.backend.entities.Movement;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.repositories.ItemRepository;
import ch.heig.pdg.backend.repositories.LocationRepository;
import ch.heig.pdg.backend.repositories.MovementRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovementService extends AbstractService {
    private final MovementRepository movementRepository;
    private final ItemRepository itemRepository;
    private final LocationRepository locationRepository;
    private final MovementMapper movementMapper;

    protected MovementService(InventoryRepository inventoryRepository, MovementRepository movementRepository, ItemRepository itemRepository, LocationRepository locationRepository, MovementMapper movementMapper) {
        super(inventoryRepository);
        this.movementRepository = movementRepository;
        this.itemRepository = itemRepository;
        this.locationRepository = locationRepository;
        this.movementMapper = movementMapper;
    }

    public MovementDTO addMovement(MovementDTO movementDTO) {
        Movement movement = this.movementMapper.createFromDTO(movementDTO);
        movement.setItem(this.getEntityIfExists(movementDTO.getItemId(), this.itemRepository));
        movement.setLocation(this.getEntityIfExists(movementDTO.getLocationId(), this.locationRepository));

        return (MovementDTO) this.movementMapper.getDTO(
                this.movementRepository.save(movement)
        );
    }

    public MovementDTO removeMovement(Integer id) {
        Movement movement = this.getEntityIfExists(id, this.movementRepository);
        this.movementRepository.deleteById(id);
        return (MovementDTO) this.movementMapper.getDTO(movement);
    }

    public MovementDTO getMovement(Integer id) {
        return (MovementDTO) this.movementMapper.getDTO(
                this.getEntityIfExists(id, this.movementRepository)
        );
    }

    public List<MovementDTO> getMovements(HugoSearchFilter<Movement> filter) {
        return this.movementRepository
                .findByFilter(filter)
                .stream()
                .map(m -> (MovementDTO) this.movementMapper.getDTO(m))
                .collect(Collectors.toList());
    }
}
