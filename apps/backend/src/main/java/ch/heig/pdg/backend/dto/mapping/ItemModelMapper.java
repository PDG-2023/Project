package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.entities.ItemModel;
import org.springframework.stereotype.Service;

@Service
public class ItemModelMapper implements IDataTransferObjectManager<ItemModel> {
    @Override
    public IDataTransferObject<ItemModel> getDTO(ItemModel object) {
        return null;
    }

    @Override
    public ItemModel createFromDTO(IDataTransferObject<ItemModel> dto) {
        return null;
    }

    @Override
    public ItemModel updateFromDTO(ItemModel object, IDataTransferObject<ItemModel> dto) {
        return null;
    }
}
