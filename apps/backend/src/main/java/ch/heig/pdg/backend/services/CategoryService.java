package ch.heig.pdg.backend.services;

import ch.heig.pdg.backend.dto.CategoryDTO;
import ch.heig.pdg.backend.dto.mapping.CategoryMapper;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.exception.exceptions.NotFoundException;
import ch.heig.pdg.backend.repositories.CategoryRepository;
import ch.heig.pdg.backend.repositories.InventoryRepository;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final InventoryRepository inventoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, InventoryRepository inventoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.inventoryRepository = inventoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public List<CategoryDTO> getCategories(Integer inventoryId, HugoSearchFilter<Category> filter) {
        if (!this.inventoryRepository.existsById(inventoryId)) {
            throw new NotFoundException("Inventory with id " + inventoryId + " was not found");
        }

        return this.categoryRepository
                .findByFilter(filter, inventoryId)
                .stream()
                .map(c -> (CategoryDTO) this.categoryMapper.getDTO(c))
                .collect(Collectors.toList());
    }
}
