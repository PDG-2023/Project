package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.InventoryDTO;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.repositories.UserRepository;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class InventoryMapper extends AbstractDataMapper implements IDataTransferObjectManager<Inventory> {
    private final UserRepository userRepository;

    public InventoryMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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
        Inventory inventory = new Inventory();
        inventory.setOwner(this.getEntityIfExists(1, this.userRepository));
        return this.updateFromDTO(inventory, dto);
    }

    @Override
    public Inventory updateFromDTO(Inventory inventory, IDataTransferObject<Inventory> dto) {
        InventoryDTO inventoryDTO = (InventoryDTO) dto;
        inventory.setName(inventoryDTO.getName());
        // FIXME: need list of user ids here in dto
        return inventory;
    }
}
