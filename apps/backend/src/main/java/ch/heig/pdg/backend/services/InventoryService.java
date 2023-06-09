package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.InventoryDTO;
import ch.heig.pdg.backend.dto.mapping.InventoryMapper;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService extends AbstractService {
    private final InventoryMapper inventoryMapper;

    protected InventoryService(InventoryRepository inventoryRepository, InventoryMapper inventoryMapper) {
        super(inventoryRepository);
        this.inventoryMapper = inventoryMapper;
    }

    public List<InventoryDTO> getInventories(HugoSearchFilter<Inventory> filter) {
        return this.inventoryRepository
                .findByFilter(filter)
                .stream()
                .map(inventory -> (InventoryDTO) this.inventoryMapper.getDTO(inventory))
                .collect(Collectors.toList());
    }

    public Integer getInventoriesCount(HugoSearchFilter<Inventory> filter) {
        return this.inventoryRepository.count(filter);
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

        return (InventoryDTO) this.inventoryMapper.getDTO(
                this.inventoryRepository.save(inventory)
        );
    }

    public InventoryDTO removeInventory(Integer id) {
        InventoryDTO inventoryDTO = (InventoryDTO) this.inventoryMapper.getDTO(this.getEntityIfExists(id, this.inventoryRepository));
        this.inventoryRepository.deleteById(id);
        return inventoryDTO;
    }
}
