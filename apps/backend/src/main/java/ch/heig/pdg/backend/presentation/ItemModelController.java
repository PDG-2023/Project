package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.dto.ItemModelDTO;
import ch.heig.pdg.backend.entities.ItemModel;
import ch.heig.pdg.backend.security.annotations.AuthenticationRequired;
import ch.heig.pdg.backend.services.ItemModelService;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ItemModelController extends AbstractController implements ch.heig.pdg.backend.api.ItemModelApi {
    private final ItemModelService itemModelService;

    public ItemModelController(HttpServletRequest httpServletRequest, ItemModelService itemModelService) {
        super(httpServletRequest);
        this.itemModelService = itemModelService;
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<ItemModelDTO> createItemModel(Integer inventoryId, ItemModelDTO itemModelDTO) {
        return new ResponseEntity<>(
                this.itemModelService.addItemModel(inventoryId, itemModelDTO),
                HttpStatus.CREATED
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<ItemModelDTO> deleteItemModel(Integer id) {
        return new ResponseEntity<>(
                this.itemModelService.removeItemModel(id),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<ItemModelDTO> getItemModel(Integer id) {
        return new ResponseEntity<>(
                this.itemModelService.getItemModel(id),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<List<ItemModelDTO>> getItemModels(Integer inventoryId) {
        HugoSearchFilter<ItemModel> filter = HugoSearchFilter.build(this.httpServletRequest, ItemModel.class);

        List<ItemModelDTO> itemModels = this.itemModelService.getItemModels(inventoryId, filter);
        return new ResponseEntity<>(
                itemModels,
                new LinkedMultiValueMap<>(Map.of("X-Total", List.of(String.format("%d", this.itemModelService.getItemModelsCount(inventoryId, filter))))),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<ItemModelDTO> updateItemModel(Integer id, ItemModelDTO itemModelDTO) {
        return new ResponseEntity<>(
                this.itemModelService.updateItemModel(id, itemModelDTO),
                HttpStatus.OK
        );
    }
}
