package ch.heig.pdg.backend.integration;

import ch.heig.pdg.backend.dto.ItemDTO;
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
public class ItemControllerIntegrationTest extends AbstractAuthenticatedIntegrationTest {
    @Test
    public void givenItemValid_whenGetInventories_thenStatus200() throws Exception {
        this.mvc.perform(get("/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].modelId").value(1));
    }

    @Test
    public void givenItem_whenGetItem_thenStatus200() throws Exception {
        this.mvc.perform(get("/items/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.modelId").value(1));
    }

    @Test
    public void givenInvalidItem_whenGetItem_thenStatus404() throws Exception {
        this.mvc.perform(get("/items/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNotFound());
    }

    @Test
    public void givenItem_whenPostItem_thenStatus204() throws Exception {
        int modelId = 1;
        ItemDTO dto = new ItemDTO();
        dto.setModelId(modelId);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(post("/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.modelId").value(modelId));
    }

    @Test
    public void givenItem_whenPutItem_thenStatus204() throws Exception {
        int modelId = 1;
        ItemDTO dto = new ItemDTO();
        dto.setModelId(modelId);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(put("/items/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.modelId").value(modelId));
    }

    @Test
    public void givenItem_whenDeleteItem_thenStatus200_andThen4040() throws Exception {
        this.mvc.perform(delete("/items/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        this.mvc.perform(get("/items/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNotFound());
    }
}
