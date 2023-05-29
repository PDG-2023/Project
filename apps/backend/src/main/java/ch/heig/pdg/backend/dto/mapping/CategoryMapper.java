package ch.heig.pdg.backend.dto.mapping;

import ch.heig.pdg.backend.dto.CategoryDTO;
import ch.heig.pdg.backend.dto.IDataTransferObject;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.utils.DateFormatUtil;
import org.springframework.stereotype.Service;

@Service
public class CategoryMapper extends AbstractDataMapper implements IDataTransferObjectManager<Category> {

    @Override
    public IDataTransferObject<Category> getDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setCreated(DateFormatUtil.dateToString(category.getCreatedAt()));
        dto.setUpdated(DateFormatUtil.dateToString(category.getUpdatedAt()));
        dto.setParentCategoryId(this.idOrNull(category.getParent()));
        return dto;
    }

    @Override
    public Category createFromDTO(IDataTransferObject<Category> dto) {
        return this.updateFromDTO(new Category(), dto);
    }

    @Override
    public Category updateFromDTO(Category category, IDataTransferObject<Category> dto) {

        CategoryDTO categoryDTO = (CategoryDTO) dto;
        category.setName(categoryDTO.getName());
        if (categoryDTO.getParentCategoryId().isPresent()) {
            category.setParent(this.entityManager.getReference(Category.class, categoryDTO.getParentCategoryId().get()));
        }
        return category;
    }
}
