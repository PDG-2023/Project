package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.exception.exceptions.NotFoundException;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

abstract public class AbstractService {
    protected final InventoryRepository inventoryRepository;

    protected AbstractService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    protected Inventory checkInventory(Integer inventoryId) {
        Optional<Inventory> inventory = this.inventoryRepository.findById(inventoryId);
        if (inventory.isEmpty()) {
            throw new NotFoundException("Inventory with id " + inventoryId + " was not found");
        }

        return inventory.get();
    }

    protected <T> T getEntityIfExists(Integer id, CrudRepository<T, Integer> repository) {
        Optional<T> entity = repository.findById(id);

        if (entity.isEmpty()) {
            throw new NotFoundException("Entity does not exist");
        }

        return entity.get();
    }
}
