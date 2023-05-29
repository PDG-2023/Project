package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.dto.InventoryDTO;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.services.InventoryService;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InventoryController implements ch.heig.pdg.backend.api.InventoryApi {
    private final InventoryService inventoryService;
    private final HttpServletRequest httpServletRequest;

    public InventoryController(InventoryService inventoryService, HttpServletRequest httpServletRequest) {
        this.inventoryService = inventoryService;
        this.httpServletRequest = httpServletRequest;
    }

    @Override
    public ResponseEntity<InventoryDTO> createInventory(InventoryDTO inventoryDTO) {
        return new ResponseEntity<>(
                this.inventoryService.addInventory(inventoryDTO),
                HttpStatus.CREATED
        );
    }

    @Override
    public ResponseEntity<InventoryDTO> deleteInventory(Integer id) {
        return new ResponseEntity<>(
                this.inventoryService.removeInventory(id),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<List<InventoryDTO>> getInventories() {
        HugoSearchFilter<Inventory> filter = HugoSearchFilter.build(this.httpServletRequest, Inventory.class);
        return new ResponseEntity<>(
                this.inventoryService.getInventories(filter),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<InventoryDTO> getInventory(Integer id) {
        return new ResponseEntity<>(
                this.inventoryService.getInventory(id),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<InventoryDTO> updateInventory(Integer id, InventoryDTO inventoryDTO) {
        return new ResponseEntity<>(
                this.inventoryService.updateInventory(id, inventoryDTO),
                HttpStatus.OK
        );
    }
}
