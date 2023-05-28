package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.InventoryDTO;
import ch.heig.pdg.backend.dto.mapping.InventoryMapper;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.exception.exceptions.NotFoundException;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.repositories.UserRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService extends AbstractService {
    private final InventoryMapper inventoryMapper;
    private final UserRepository userRepository;

    protected InventoryService(InventoryRepository inventoryRepository, InventoryMapper inventoryMapper, UserRepository userRepository) {
        super(inventoryRepository);
        this.inventoryMapper = inventoryMapper;
        this.userRepository = userRepository;
    }

    public List<InventoryDTO> getInventories(HugoSearchFilter<Inventory> filter) {
        return this.inventoryRepository
                .findByFilter(filter)
                .stream()
                .map(inventory -> (InventoryDTO) this.inventoryMapper.getDTO(inventory))
                .collect(Collectors.toList());
    }

    public InventoryDTO getInventory(Integer id) {
        return (InventoryDTO) this.inventoryMapper.getDTO(
                this.getEntityIfExists(id, this.inventoryRepository)
        );
    }

    public InventoryDTO updateInventory(Integer id, InventoryDTO inventoryDTO) {
        Inventory inventory = this.getEntityIfExists(id, this.inventoryRepository);

        return (InventoryDTO) this.inventoryMapper.getDTO(
                this.inventoryRepository.save(
                        this.inventoryMapper.updateFromDTO(inventory, inventoryDTO)
                )
        );
    }

    public InventoryDTO addInventory(InventoryDTO inventoryDTO) {
        Inventory inventory = this.inventoryMapper.createFromDTO(inventoryDTO);

        // FIXME: Change this to current userID
        inventory.setOwner(this.userRepository.findById(1).orElseThrow(NotFoundException::new));

        return (InventoryDTO) this.inventoryMapper.getDTO(
                this.inventoryRepository.save(inventory)
        );
    }

    public InventoryDTO removeInventory(Integer id) {
        Inventory inventory = this.getEntityIfExists(id, this.inventoryRepository);
        this.inventoryRepository.deleteById(id);
        return (InventoryDTO) this.inventoryMapper.getDTO(inventory);
    }
}
