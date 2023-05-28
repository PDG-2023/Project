package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.ItemDTO;
import ch.heig.pdg.backend.entities.Item;
import org.springframework.stereotype.Service;

@Service
public class ItemMapper implements IDataTransferObjectManager<Item> {
    @Override
    public IDataTransferObject<Item> getDTO(Item item) {
        ItemDTO dto = new ItemDTO();
        dto.setId(item.getId());
        dto.setCreated(item.getCreatedAt().toString());
        dto.setUpdated(item.getUpdatedAt().toString());
        dto.setModelId(item.getModel().getId());
        return dto;
    }

    @Override
    public Item createFromDTO(IDataTransferObject<Item> dto) {
        ItemDTO itemDTO = (ItemDTO) dto;
        Item item = new Item();
        return item;
    }

    @Override
    public Item updateFromDTO(Item item, IDataTransferObject<Item> dto) {
        ItemDTO itemDTO = (ItemDTO) dto;
        // nothing simple to update for now
        return item;
    }
}
