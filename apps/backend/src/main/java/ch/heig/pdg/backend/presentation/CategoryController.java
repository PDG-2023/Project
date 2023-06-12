package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.dto.CategoryDTO;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.security.annotations.AuthenticationRequired;
import ch.heig.pdg.backend.services.CategoryService;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CategoryController extends AbstractController implements ch.heig.pdg.backend.api.CategoryApi {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService, HttpServletRequest httpServletRequest) {
        super(httpServletRequest);
        this.categoryService = categoryService;
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<List<CategoryDTO>> getCategories(Integer inventoryId) {
        HugoSearchFilter<Category> filter = HugoSearchFilter.build(this.httpServletRequest, Category.class);

        List<CategoryDTO> categories = this.categoryService.getCategories(inventoryId, filter);
        return new ResponseEntity<>(
                categories,
                new LinkedMultiValueMap<>(Map.of("X-Total", List.of(String.format("%d", this.categoryService.getCategoriesCount(inventoryId, filter))))),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<CategoryDTO> createCategory(Integer inventoryId, CategoryDTO categoryDTO) {
        return new ResponseEntity<>(
                this.categoryService.addCategory(inventoryId, categoryDTO),
                HttpStatus.CREATED
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<CategoryDTO> deleteCategory(Integer id) {
        return new ResponseEntity<>(
                this.categoryService.removeCategory(id),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<CategoryDTO> getCategory(Integer id) {
        return new ResponseEntity<>(
                this.categoryService.getCategory(id),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<CategoryDTO> updateCategory(Integer id, CategoryDTO categoryDTO) {
        return new ResponseEntity<>(
                this.categoryService.updateCategory(id, categoryDTO),
                HttpStatus.OK
        );
    }
}
