package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.InventoryDTO;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class InventoryMapper implements IDataTransferObjectManager<Inventory> {
    @Override
    public IDataTransferObject<Inventory> getDTO(Inventory inventory) {
        InventoryDTO dto = new InventoryDTO();
        dto.setId(inventory.getId());
        dto.setName(inventory.getName());
        dto.setCreated(DateFormatUtil.dateToString(inventory.getCreatedAt()));
        dto.setUpdated(DateFormatUtil.dateToString(inventory.getUpdatedAt()));
        return dto;
    }

    @Override
    public Inventory createFromDTO(IDataTransferObject<Inventory> dto) {
        InventoryDTO inventoryDTO = (InventoryDTO) dto;
        Inventory inventory = new Inventory();
        inventory.setName(((InventoryDTO) dto).getName());
        return inventory;
    }

    @Override
    public Inventory updateFromDTO(Inventory inventory, IDataTransferObject<Inventory> dto) {
        InventoryDTO inventoryDTO = (InventoryDTO) dto;
        inventory.setName(inventoryDTO.getName());
        return inventory;
    }
}
