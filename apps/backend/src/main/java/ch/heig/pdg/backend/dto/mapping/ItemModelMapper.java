package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.ItemModelDTO;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.entities.ItemModel;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class ItemModelMapper extends AbstractDataMapper implements IDataTransferObjectManager<ItemModel> {
    @Override
    public IDataTransferObject<ItemModel> getDTO(ItemModel itemModel) {
        ItemModelDTO dto = new ItemModelDTO();
        dto.setId(itemModel.getId());
        dto.setName(itemModel.getName());
        dto.setDescription(itemModel.getDescription());
        dto.setCreated(DateFormatUtil.dateToString(itemModel.getCreatedAt()));
        dto.setUpdated(DateFormatUtil.dateToString(itemModel.getUpdatedAt()));
        dto.setCategories(this.getIdsOrEmptyList(itemModel.getCategories()));
        return dto;
    }

    @Override
    public ItemModel createFromDTO(IDataTransferObject<ItemModel> dto) {
        return this.updateFromDTO(new ItemModel(), dto);
    }

    @Override
    public ItemModel updateFromDTO(ItemModel itemModel, IDataTransferObject<ItemModel> dto) {
        ItemModelDTO itemModelDTO = (ItemModelDTO) dto;
        itemModel.setName(itemModelDTO.getName());
        itemModel.setDescription(itemModelDTO.getDescription());
        itemModel.setCategories(this.getReferences(itemModelDTO.getCategories(), Category.class));
        return itemModel;
    }
}
