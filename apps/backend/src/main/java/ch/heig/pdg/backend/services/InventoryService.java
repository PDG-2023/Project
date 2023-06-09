package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.InventoryDTO;
import ch.heig.pdg.backend.dto.SearchResultDTO;
import ch.heig.pdg.backend.dto.mapping.InventoryMapper;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class InventoryService extends AbstractService {
    private final InventoryMapper inventoryMapper;
    private final LocationService locationService;
    private final UserService userService;
    private final ItemModelService itemModelService;

    protected InventoryService(InventoryRepository inventoryRepository, InventoryMapper inventoryMapper, LocationService locationService, UserService userService, ItemModelService itemModelService) {
        super(inventoryRepository);
        this.inventoryMapper = inventoryMapper;
        this.locationService = locationService;
        this.userService = userService;
        this.itemModelService = itemModelService;
    }

    public List<InventoryDTO> getInventories(HugoSearchFilter<Inventory> filter) {
        return this.inventoryRepository
                .findByFilter(filter)
                .stream()
                .map(inventory -> (InventoryDTO) this.inventoryMapper.getDTO(inventory))
                .collect(Collectors.toList());
    }

    public Integer getInventoriesCount(HugoSearchFilter<Inventory> filter) {
        return this.inventoryRepository.count(filter);
    }

    public List<SearchResultDTO> searchInventory(String searchTerm, Integer inventoryId) {
        Stream<SearchResultDTO> users = this.userService.search(inventoryId, searchTerm).stream().map(
                u -> {
                    SearchResultDTO dto = new SearchResultDTO();
                    dto.id(u.getId());
                    dto.entityType("user");
                    dto.description("");
                    dto.name(u.getFirstName() + " " + u.getLastName());
                    return dto;
                }
        );
        Stream<SearchResultDTO> locations = this.locationService.search(inventoryId, searchTerm).stream().map(
                l -> {
                    SearchResultDTO dto = new SearchResultDTO();
                    dto.id(l.getId());
                    dto.entityType("location");
                    dto.description(l.getDescription());
                    dto.name(l.getName());
                    return dto;
                }
        );
        Stream<SearchResultDTO> itemModels = this.itemModelService.search(inventoryId, searchTerm).stream().map(
                i -> {
                    SearchResultDTO dto = new SearchResultDTO();
                    dto.id(i.getId());
                    dto.entityType("itemModel");
                    dto.description(i.getDescription());
                    dto.name(i.getName());
                    return dto;
                }
        );

        return Stream.of(locations, users, itemModels).flatMap(o -> o).collect(Collectors.toList());
    }

    public InventoryDTO getInventory(Integer id) {
        return (InventoryDTO) this.inventoryMapper.getDTO(
                this.getEntityIfExists(id, this.inventoryRepository)
        );
    }

    public InventoryDTO updateInventory(Integer id, InventoryDTO inventoryDTO) {
        Inventory inventory = this.getEntityIfExists(id, this.inventoryRepository);

        return (InventoryDTO) this.inventoryMapper.getDTO(
                this.inventoryRepository.save(
                        this.inventoryMapper.updateFromDTO(inventory, inventoryDTO)
                )
        );
    }

    public InventoryDTO addInventory(InventoryDTO inventoryDTO) {
        Inventory inventory = this.inventoryMapper.createFromDTO(inventoryDTO);

        return (InventoryDTO) this.inventoryMapper.getDTO(
                this.inventoryRepository.save(inventory)
        );
    }

    public InventoryDTO removeInventory(Integer id) {
        InventoryDTO inventoryDTO = (InventoryDTO) this.inventoryMapper.getDTO(this.getEntityIfExists(id, this.inventoryRepository));
        this.inventoryRepository.deleteById(id);
        return inventoryDTO;
    }
}
