package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.dto.InventoryDTO;
import ch.heig.pdg.backend.dto.SearchResultDTO;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.security.annotations.AuthenticationRequired;
import ch.heig.pdg.backend.services.InventoryService;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class InventoryController implements ch.heig.pdg.backend.api.InventoryApi {
    private final InventoryService inventoryService;
    private final HttpServletRequest httpServletRequest;

    public InventoryController(InventoryService inventoryService, HttpServletRequest httpServletRequest) {
        this.inventoryService = inventoryService;
        this.httpServletRequest = httpServletRequest;
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<InventoryDTO> createInventory(InventoryDTO inventoryDTO) {
        return new ResponseEntity<>(
                this.inventoryService.addInventory(inventoryDTO),
                HttpStatus.CREATED
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<InventoryDTO> deleteInventory(Integer id) {
        return new ResponseEntity<>(
                this.inventoryService.removeInventory(id),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<List<InventoryDTO>> getInventories() {
        HugoSearchFilter<Inventory> filter = HugoSearchFilter.build(this.httpServletRequest, Inventory.class);
        List<InventoryDTO> inventories = this.inventoryService.getInventories(filter);
        return new ResponseEntity<>(
                inventories,
                new LinkedMultiValueMap<>(Map.of("X-Total", List.of(String.format("%d", inventories.size())))),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<InventoryDTO> getInventory(Integer id) {
        return new ResponseEntity<>(
                this.inventoryService.getInventory(id),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<InventoryDTO> updateInventory(Integer id, InventoryDTO inventoryDTO) {
        return new ResponseEntity<>(
                this.inventoryService.updateInventory(id, inventoryDTO),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<List<SearchResultDTO>> searchInventory(String searchTerm, Integer id) {
        return new ResponseEntity<>(
                this.inventoryService.searchInventory(searchTerm, id),
                HttpStatus.OK
        );
    }
}
