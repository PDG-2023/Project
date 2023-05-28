package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.CategoryDTO;
import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.entities.Category;
import org.springframework.stereotype.Service;

@Service
public class CategoryMapper implements IDataTransferObjectManager<Category> {
    @Override
    public IDataTransferObject<Category> getDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }

    @Override
    public Category createFromDTO(IDataTransferObject<Category> dto) {
        return null;
    }

    @Override
    public Category updateFromDTO(Category object, IDataTransferObject<Category> dto) {
        return null;
    }
}
