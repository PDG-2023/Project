package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.ItemDTO;
import ch.heig.pdg.backend.dto.mapping.ItemMapper;
import ch.heig.pdg.backend.entities.Item;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.repositories.ItemRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService extends AbstractService {
    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;

    protected ItemService(InventoryRepository inventoryRepository, ItemRepository itemRepository, ItemMapper itemMapper) {
        super(inventoryRepository);
        this.itemRepository = itemRepository;
        this.itemMapper = itemMapper;
    }

    public ItemDTO addItem(ItemDTO itemDTO) {
        return (ItemDTO) this.itemMapper.getDTO(
                this.itemRepository.save(
                        this.itemMapper.createFromDTO(itemDTO)
                )
        );
    }

    public ItemDTO removeItem(Integer id) {
        Item item = this.getEntityIfExists(id, this.itemRepository);
        this.itemRepository.deleteById(id);
        return (ItemDTO) this.itemMapper.getDTO(item);
    }

    public ItemDTO getItem(Integer id) {
        return (ItemDTO) this.itemMapper.getDTO(
                this.getEntityIfExists(id, this.itemRepository)
        );
    }

    public List<ItemDTO> getItems(HugoSearchFilter<Item> filter) {
        return this.itemRepository
                .findByFilter(filter)
                .stream()
                .map(i -> (ItemDTO) this.itemMapper.getDTO(i))
                .collect(Collectors.toList());
    }

    public ItemDTO updateItem(Integer id, ItemDTO itemDTO) {
        Item item = this.getEntityIfExists(id, this.itemRepository);

        return (ItemDTO) this.itemMapper.getDTO(
                this.itemRepository.save(
                        this.itemMapper.updateFromDTO(item, itemDTO)
                )
        );
    }
}
