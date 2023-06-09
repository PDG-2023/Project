package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.MovementDTO;
import ch.heig.pdg.backend.dto.mapping.MovementMapper;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.entities.Movement;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.repositories.MovementRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovementService extends AbstractService {
    private final MovementRepository movementRepository;
    private final MovementMapper movementMapper;

    protected MovementService(InventoryRepository inventoryRepository, MovementRepository movementRepository, MovementMapper movementMapper) {
        super(inventoryRepository);
        this.movementRepository = movementRepository;
        this.movementMapper = movementMapper;
    }

    public MovementDTO addMovement(MovementDTO movementDTO) {

        return (MovementDTO) this.movementMapper.getDTO(
                this.movementRepository.save(
                        this.movementMapper.createFromDTO(movementDTO)
                )
        );
    }

    public MovementDTO removeMovement(Integer id) {
        MovementDTO movementDTO = (MovementDTO) this.movementMapper.getDTO(this.getEntityIfExists(id, this.movementRepository));
        this.movementRepository.deleteById(id);
        return movementDTO;
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

    public Integer getMovementsCount(HugoSearchFilter<Movement> filter) {
        return this.movementRepository.count(filter);
    }
}
