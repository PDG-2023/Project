package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.dto.ItemModelDTO;
import ch.heig.pdg.backend.entities.ItemModel;
import org.springframework.stereotype.Service;

@Service
public class ItemModelMapper implements IDataTransferObjectManager<ItemModel> {
    @Override
    public IDataTransferObject<ItemModel> getDTO(ItemModel itemModel) {
        ItemModelDTO dto = new ItemModelDTO();
        dto.setId(itemModel.getId());
        dto.setName(itemModel.getName());
        dto.setCreated(itemModel.getCreatedAt().toString());
        dto.setUpdated(itemModel.getUpdatedAt().toString());
        return dto;
    }

    @Override
    public ItemModel createFromDTO(IDataTransferObject<ItemModel> dto) {
        ItemModelDTO itemModelDTO = (ItemModelDTO) dto;
        ItemModel itemModel = new ItemModel();
        itemModel.setName(itemModelDTO.getName());
        itemModel.setDescription(itemModelDTO.getDescription());
        return itemModel;
    }

    @Override
    public ItemModel updateFromDTO(ItemModel itemModel, IDataTransferObject<ItemModel> dto) {
        ItemModelDTO itemModelDTO = (ItemModelDTO) dto;
        itemModel.setName(itemModelDTO.getName());
        itemModel.setDescription(itemModelDTO.getDescription());
        return itemModel;
    }
}
