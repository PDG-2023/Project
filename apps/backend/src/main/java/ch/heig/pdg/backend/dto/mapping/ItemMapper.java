package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.ItemDTO;
import ch.heig.pdg.backend.entities.Item;
import ch.heig.pdg.backend.entities.ItemModel;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class ItemMapper extends AbstractDataMapper implements IDataTransferObjectManager<Item> {

    @Override
    public IDataTransferObject<Item> getDTO(Item item) {
        ItemDTO dto = new ItemDTO();
        dto.setId(item.getId());
        dto.setCreated(DateFormatUtil.dateToString(item.getCreatedAt()));
        dto.setUpdated(DateFormatUtil.dateToString(item.getUpdatedAt()));
        dto.setModelId(item.getModel().getId());
        return dto;
    }

    @Override
    public Item createFromDTO(IDataTransferObject<Item> dto) {
        return this.updateFromDTO(new Item(), dto);
    }

    @Override
    public Item updateFromDTO(Item item, IDataTransferObject<Item> dto) {
        ItemDTO itemDTO = (ItemDTO) dto;
        item.setModel(this.entityManager.getReference(ItemModel.class, itemDTO.getModelId()));
        return item;
    }
}
