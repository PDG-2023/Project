package ch.heig.pdg.backend.integration;

import ch.heig.pdg.backend.dto.InventoryDTO;
import ch.heig.pdg.backend.utility.AbstractAuthenticatedIntegrationTest;
import ch.heig.pdg.backend.utility.IntegrationTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@IntegrationTest
public class InventoryControllerIntegrationTest extends AbstractAuthenticatedIntegrationTest {
    @Test
    public void givenInventoryValid_whenGetInventories_thenStatus200() throws Exception {
        this.mvc.perform(get("/inventories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(header().exists("X-Total"))
                .andExpect(header().string("X-Total", "1"))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("test inventory"));
    }

    @Test
    public void givenInventoryValid_whenSearchInventoryForTermThatMatchesAUser_thenResultsPresent() throws Exception {
        this.mvc.perform(get("/inventory/1/search?searchTerm=aul")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].entityType").value("user"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Paul Test"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].description").value(""));
    }

    @Test
    public void givenInventoryValid_whenSearchInventoryForTermThatMatchesALocation_thenResultsPresent() throws Exception {
        this.mvc.perform(get("/inventory/1/search?searchTerm=other description")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].entityType").value("location"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("another name"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].description").value("an other description"));
    }

    @Test
    public void givenInventoryValid_whenSearchInventoryForTermThatMatchesAnItemModel_thenResultsPresent() throws Exception {
        this.mvc.perform(get("/inventory/1/search?searchTerm=notCommonDes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].entityType").value("itemModel"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("name"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].description").value("notCommonDesc"));
    }

    @Test
    public void givenInventory_whenGetInventory_thenStatus200() throws Exception {
        this.mvc.perform(get("/inventories/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("test inventory"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.owner_id").value(1));
    }

    @Test
    public void givenInvalidInventory_whenGetInventory_thenStatus404() throws Exception {
        this.mvc.perform(get("/inventories/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNotFound());
    }

    @Test
    public void givenInventory_whenPostInventory_thenStatus204() throws Exception {
        String invName = "Test";
        InventoryDTO dto = new InventoryDTO();
        dto.setName(invName);
        dto.setOwnerId(1);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(post("/inventories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(invName));
    }

    @Test
    public void givenInventory_whenPutInventory_thenStatus204() throws Exception {
        String invName = "Test";
        InventoryDTO dto = new InventoryDTO();
        dto.setName(invName);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(put("/inventories/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(invName));
    }

    @Test
    public void givenInventory_whenDeleteInventory_thenStatus200_andThen4040() throws Exception {
        this.mvc.perform(delete("/inventories/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        this.mvc.perform(get("/inventories/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNotFound());
    }
}
