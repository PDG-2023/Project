package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.entities.Inventory;
import org.springframework.stereotype.Service;

@Service
public class InventoryMapper implements IDataTransferObjectManager<Inventory> {
    @Override
    public IDataTransferObject<Inventory> getDTO(Inventory object) {
        return null;
    }

    @Override
    public Inventory createFromDTO(IDataTransferObject<Inventory> dto) {
        return null;
    }

    @Override
    public Inventory updateFromDTO(Inventory object, IDataTransferObject<Inventory> dto) {
        return null;
    }
}
