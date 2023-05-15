package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.entities.Item;

public class ItemMapper implements IDataTransferObjectManager<Item> {
    @Override
    public IDataTransferObject<Item> getDTO(Item object) {
        return null;
    }

    @Override
    public Item createFromDTO(IDataTransferObject<Item> dto) {
        return null;
    }

    @Override
    public Item updateFromDTO(Item object, IDataTransferObject<Item> dto) {
        return null;
    }
}
