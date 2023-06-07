package ch.heig.pdg.backend.integration;

import ch.heig.pdg.backend.dto.MovementDTO;
import ch.heig.pdg.backend.utility.AbstractAuthenticatedIntegrationTest;
import ch.heig.pdg.backend.utility.IntegrationTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@IntegrationTest
public class MovementControllerIntegrationTest extends AbstractAuthenticatedIntegrationTest {
    @Test
    public void givenMovementValid_whenGetInventories_thenStatus200() throws Exception {
        this.mvc.perform(get("/movements")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(header().exists("X-Total"))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].movementType").value("IN"));
    }

    @Test
    public void givenMovement_whenGetMovement_thenStatus200() throws Exception {
        this.mvc.perform(get("/movements/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.movementType").value("IN"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.locationId").value(1));
    }

    @Test
    public void givenInvalidMovement_whenGetMovement_thenStatus404() throws Exception {
        this.mvc.perform(get("/movements/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNotFound());
    }

    @Test
    public void givenMovement_whenPostMovement_thenStatus204() throws Exception {
        String type = "IN";
        MovementDTO dto = new MovementDTO();
        dto.setLocationId(1);
        dto.setMovementType(type);
        dto.setItemId(1);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(post("/movements")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.movementType").value(type));
    }
}
