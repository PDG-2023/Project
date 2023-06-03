package ch.heig.pdg.backend.integration;

import ch.heig.pdg.backend.AuthenticatedIntegrationTest;
import ch.heig.pdg.backend.dto.InventoryDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AuthenticatedIntegrationTest
public class InventoryControllerIntegrationTest {
    @Autowired
    private MockMvc mvc;

    @Test
    public void givenInventoryValid_whenGetInventories_thenStatus200() throws Exception {
        this.mvc.perform(get("/inventories").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("test inventory"));
    }

    @Test
    public void givenInventory_whenGetInventory_thenStatus200() throws Exception {
        this.mvc.perform(get("/inventories/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("test inventory"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.owner_id").value(1));
    }

    @Test
    public void givenInvalidInventory_whenGetInventory_thenStatus404() throws Exception {
        this.mvc.perform(get("/inventories/2").contentType(MediaType.APPLICATION_JSON))
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
                )
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(invName));
    }

    @Test
    public void givenInventory_whenDeleteInventory_thenStatus200_andThen4040() throws Exception {
        this.mvc.perform(delete("/inventories/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        this.mvc.perform(get("/inventories/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}