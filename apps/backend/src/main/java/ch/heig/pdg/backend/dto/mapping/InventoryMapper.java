package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.InventoryDTO;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.entities.User;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class InventoryMapper extends AbstractDataMapper implements IDataTransferObjectManager<Inventory> {

    @Override
    public IDataTransferObject<Inventory> getDTO(Inventory inventory) {
        InventoryDTO dto = new InventoryDTO();
        dto.setId(inventory.getId());
        dto.setName(inventory.getName());
        dto.setOwnerId(inventory.getOwner().getId());
        dto.setCreated(DateFormatUtil.dateToString(inventory.getCreatedAt()));
        dto.setUpdated(DateFormatUtil.dateToString(inventory.getUpdatedAt()));
        dto.setUsers(this.getIdsOrEmptyList(inventory.getUsers()));
        return dto;
    }

    @Override
    public Inventory createFromDTO(IDataTransferObject<Inventory> dto) {
        InventoryDTO inventoryDTO = (InventoryDTO) dto;
        Inventory inventory = new Inventory();
        inventory.setOwner(this.entityManager.getReference(User.class, inventoryDTO.getOwnerId()));
        return this.updateFromDTO(inventory, dto);
    }

    @Override
    public Inventory updateFromDTO(Inventory inventory, IDataTransferObject<Inventory> dto) {
        InventoryDTO inventoryDTO = (InventoryDTO) dto;
        inventory.setName(inventoryDTO.getName());
        inventory.setUsers(this.getReferences(inventoryDTO.getUsers(), User.class));
        return inventory;
    }
}
