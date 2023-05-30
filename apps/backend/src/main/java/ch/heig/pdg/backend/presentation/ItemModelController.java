package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.dto.ItemModelDTO;
import ch.heig.pdg.backend.entities.ItemModel;
import ch.heig.pdg.backend.services.ItemModelService;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ItemModelController extends AbstractController implements ch.heig.pdg.backend.api.ItemModelApi {
    private final ItemModelService itemModelService;

    public ItemModelController(HttpServletRequest httpServletRequest, ItemModelService itemModelService) {
        super(httpServletRequest);
        this.itemModelService = itemModelService;
    }

    @Override
    public ResponseEntity<ItemModelDTO> createItemModel(Integer inventoryId, ItemModelDTO itemModelDTO) {
        return new ResponseEntity<>(
                this.itemModelService.addItemModel(inventoryId, itemModelDTO),
                HttpStatus.CREATED
        );
    }

    @Override
    public ResponseEntity<ItemModelDTO> deleteItemModel(Integer id) {
        return new ResponseEntity<>(
                this.itemModelService.removeItemModel(id),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<ItemModelDTO> getItemModel(Integer id) {
        return new ResponseEntity<>(
                this.itemModelService.getItemModel(id),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<List<ItemModelDTO>> getItemModels(Integer inventoryId) {
        HugoSearchFilter<ItemModel> filter = HugoSearchFilter.build(this.httpServletRequest, ItemModel.class);

        return new ResponseEntity<>(
                this.itemModelService.getItemModels(inventoryId, filter),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<ItemModelDTO> updateItemModel(Integer id, ItemModelDTO itemModelDTO) {
        return new ResponseEntity<>(
                this.itemModelService.updateItemModel(id, itemModelDTO),
                HttpStatus.OK
        );
    }
}
