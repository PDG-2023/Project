package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.dto.CategoryDTO;
import ch.heig.pdg.backend.entities.Category;
import ch.heig.pdg.backend.services.CategoryService;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController implements ch.heig.pdg.backend.api.CategoryApi {

    private final CategoryService categoryService;
    private final HttpServletRequest httpServletRequest;

    public CategoryController(CategoryService categoryService, HttpServletRequest httpServletRequest) {
        this.categoryService = categoryService;
        this.httpServletRequest = httpServletRequest;
    }

    @Override
    public ResponseEntity<List<CategoryDTO>> getCategories(Integer inventoryId) {
        HugoSearchFilter<Category> filter = HugoSearchFilter.build(this.httpServletRequest);

        return new ResponseEntity<>(
                this.categoryService.getCategories(inventoryId, filter),
                HttpStatus.OK
        );
    }
}
