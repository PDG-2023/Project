package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.CategoryDTO;
import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class CategoryMapper implements IDataTransferObjectManager<Category> {
    @Override
    public IDataTransferObject<Category> getDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setCreated(DateFormatUtil.dateToString(category.getCreatedAt()));
        dto.setUpdated(DateFormatUtil.dateToString(category.getUpdatedAt()));
        return dto;
    }

    @Override
    public Category createFromDTO(IDataTransferObject<Category> dto) {
        CategoryDTO categoryDTO = (CategoryDTO) dto;
        Category category = new Category();
        category.setName(categoryDTO.getName());
        return category;
    }

    @Override
    public Category updateFromDTO(Category category, IDataTransferObject<Category> dto) {
        CategoryDTO categoryDTO = (CategoryDTO) dto;
        category.setName(categoryDTO.getName());
        return category;
    }
}
