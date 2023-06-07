package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.dto.ItemDTO;
import ch.heig.pdg.backend.entities.Item;
import ch.heig.pdg.backend.security.annotations.AuthenticationRequired;
import ch.heig.pdg.backend.services.ItemService;
import ch.heig.pdg.backend.utils.HugoSearchFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ItemController extends AbstractController implements ch.heig.pdg.backend.api.ItemApi {
    private final ItemService itemService;
    public ItemController(HttpServletRequest httpServletRequest, ItemService itemService) {
        super(httpServletRequest);
        this.itemService = itemService;
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<ItemDTO> createItem(ItemDTO itemDTO) {
        return new ResponseEntity<>(
                this.itemService.addItem(itemDTO),
                HttpStatus.CREATED
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<ItemDTO> deleteItem(Integer id) {
        return new ResponseEntity<>(
                this.itemService.removeItem(id),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<ItemDTO> getItem(Integer id) {
        return new ResponseEntity<>(
                this.itemService.getItem(id),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<List<ItemDTO>> getItems() {
        HugoSearchFilter<Item> filter = HugoSearchFilter.build(this.httpServletRequest, Item.class);

        List<ItemDTO> items = this.itemService.getItems(filter);
        return new ResponseEntity<>(
                items,
                new LinkedMultiValueMap<>(Map.of("X-Total", List.of(String.format("%d", items.size())))),
                HttpStatus.OK
        );
    }

    @AuthenticationRequired
    @Override
    public ResponseEntity<ItemDTO> updateItem(Integer id, ItemDTO itemDTO) {
        return new ResponseEntity<>(
                this.itemService.updateItem(id, itemDTO),
                HttpStatus.OK
        );
    }
}
