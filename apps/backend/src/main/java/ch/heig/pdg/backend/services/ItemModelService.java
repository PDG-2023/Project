package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.ItemModelDTO;
import ch.heig.pdg.backend.dto.mapping.ItemModelMapper;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.entities.Item;
import ch.heig.pdg.backend.entities.ItemModel;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.repositories.ItemModelRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemModelService extends AbstractService {
    private final ItemModelRepository itemModelRepository;
    private final ItemModelMapper itemModelMapper;

    protected ItemModelService(InventoryRepository inventoryRepository, ItemModelRepository itemModelRepository, ItemModelMapper itemModelMapper) {
        super(inventoryRepository);
        this.itemModelRepository = itemModelRepository;
        this.itemModelMapper = itemModelMapper;
    }

    public List<ItemModelDTO> search(Integer inventoryId, String searchTerm) {
        return this.itemModelRepository
                .search(inventoryId, searchTerm)
                .stream()
                .map(i -> (ItemModelDTO) this.itemModelMapper.getDTO(i))
                .collect(Collectors.toList());
    }

    public ItemModelDTO addItemModel(Integer inventoryId, ItemModelDTO itemModelDTO) {
        Inventory inventory = this.checkInventory(inventoryId);

        ItemModel itemModel = this.itemModelMapper.createFromDTO(itemModelDTO);
        itemModel.setInventory(inventory);

        return (ItemModelDTO) this.itemModelMapper.getDTO(
                this.itemModelRepository.save(itemModel)
        );
    }

    public ItemModelDTO removeItemModel(Integer id) {
        ItemModelDTO itemModelDTO = (ItemModelDTO) this.itemModelMapper.getDTO(this.getEntityIfExists(id, this.itemModelRepository));
        this.itemModelRepository.deleteById(id);
        return itemModelDTO;
    }

    public ItemModelDTO getItemModel(Integer id) {
        return (ItemModelDTO) this.itemModelMapper.getDTO(
                this.getEntityIfExists(id, this.itemModelRepository)
        );
    }

    public List<ItemModelDTO> getItemModels(Integer inventoryId, HugoSearchFilter<ItemModel> filter) {
        this.checkInventory(inventoryId);

        return this.itemModelRepository
                .findByFilter(filter)
                .stream()
                .map(i -> (ItemModelDTO) this.itemModelMapper.getDTO(i))
                .collect(Collectors.toList());
    }

    public Integer getItemModelsCount(Integer inventoryId, HugoSearchFilter<ItemModel> filter) {
        this.checkInventory(inventoryId);

        return this.itemModelRepository.count(filter, inventoryId);
    }

    public ItemModelDTO updateItemModel(Integer id, ItemModelDTO itemModelDTO) {
        ItemModel itemModel = this.getEntityIfExists(id, this.itemModelRepository);

        return (ItemModelDTO) this.itemModelMapper.getDTO(
                this.itemModelRepository.save(
                        this.itemModelMapper.updateFromDTO(itemModel, itemModelDTO)
                )
        );
    }
}
