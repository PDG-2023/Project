package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.CategoryDTO;
import ch.heig.pdg.backend.dto.InventoryDTO;
import ch.heig.pdg.backend.dto.mapping.CategoryMapper;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.entities.Inventory;
import ch.heig.pdg.backend.repositories.CategoryRepository;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService extends AbstractService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, InventoryRepository inventoryRepository, CategoryMapper categoryMapper) {
        super(inventoryRepository);
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public CategoryDTO getCategory(Integer id) {
        return (CategoryDTO) this.categoryMapper.getDTO(
                this.getEntityIfExists(id, this.categoryRepository)
        );
    }

    public List<CategoryDTO> getCategories(Integer inventoryId, HugoSearchFilter<Category> filter) {
        this.checkInventory(inventoryId);

        return this.categoryRepository
                .findByFilter(filter, inventoryId)
                .stream()
                .map(c -> (CategoryDTO) this.categoryMapper.getDTO(c))
                .collect(Collectors.toList());
    }

    public CategoryDTO addCategory(Integer inventoryId, CategoryDTO categoryDTO) {
        Inventory inventory = this.checkInventory(inventoryId);

        Category category = this.categoryMapper.createFromDTO(categoryDTO);
        category.setInventory(inventory);

        return (CategoryDTO) this.categoryMapper.getDTO(
                this.categoryRepository.save(category)
        );
    }

    public CategoryDTO removeCategory(Integer id) {
        CategoryDTO categoryDTO = (CategoryDTO) this.categoryMapper.getDTO(this.getEntityIfExists(id, this.categoryRepository));
        this.categoryRepository.deleteById(id);
        return categoryDTO;
    }

    public CategoryDTO updateCategory(Integer id, CategoryDTO categoryDTO) {
        Category category = this.getEntityIfExists(id, this.categoryRepository);

        return (CategoryDTO) this.categoryMapper.getDTO(
                this.categoryRepository.save(
                        this.categoryMapper.updateFromDTO(category, categoryDTO)
                )
        );
    }
}
