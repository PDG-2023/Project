package ch.heig.pdg.backend.integration;

import ch.heig.pdg.backend.dto.ItemModelDTO;
import ch.heig.pdg.backend.utility.AbstractAuthenticatedIntegrationTest;
import ch.heig.pdg.backend.utility.IntegrationTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@IntegrationTest
public class ItemModelControllerIntegrationTest extends AbstractAuthenticatedIntegrationTest {
    @Test
    public void givenInventoryValid_whenGetItemModels_thenStatus200() throws Exception {
        this.mvc.perform(get("/inventory/1/item-models")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("name"));
    }

    @Test
    public void givenInventoryInvalid_whenGetItemModels_thenStatus404() throws Exception {
        this.mvc.perform(get("/inventory/2/item-models")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().is(404));
    }

    @Test
    public void givenItemModel_whenGetItemModel_thenStatus200() throws Exception {
        this.mvc.perform(get("/item-models/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("name"));
    }

    @Test
    public void givenItemModel_whenPostItemModel_thenStatus204() throws Exception {
        String itemModelName = "Test";
        String description = "a description";
        ItemModelDTO dto = new ItemModelDTO();
        dto.setName(itemModelName);
        dto.setDescription(description);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();


        this.mvc.perform(post("/inventory/1/item-models")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isCreated())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(itemModelName))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(description));
    }

    @Test
    public void givenItemModel_whenPutItemModel_thenStatus200() throws Exception {
        String itemModelName = "Test";
        String description = "a description";
        ItemModelDTO dto = new ItemModelDTO();
        dto.setName(itemModelName);
        dto.setDescription(description);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(put("/item-models/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(itemModelName))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(description));
    }

    @Test
    public void givenItemModel_whenDeleteItemModel_thenStatus200_andThen4040() throws Exception {
        this.mvc.perform(delete("/item-models/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        this.mvc.perform(get("/item-models/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNotFound());
    }
}
