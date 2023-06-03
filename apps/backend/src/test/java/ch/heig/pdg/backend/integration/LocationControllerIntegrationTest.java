package ch.heig.pdg.backend.integration;

import ch.heig.pdg.backend.AuthenticatedIntegrationTest;
import ch.heig.pdg.backend.dto.LocationDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.Test;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AuthenticatedIntegrationTest
public class LocationControllerIntegrationTest {
    @Autowired
    private MockMvc mvc;

    @Test
    public void givenInventoryValid_whenGetLocations_thenStatus200() throws Exception {
        this.mvc.perform(get("/inventory/1/locations").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("location name"));
    }

    @Test
    public void givenInventoryInvalid_whenGetLocations_thenStatus404() throws Exception {
        this.mvc.perform(get("/inventory/2/locations").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(404));
    }

    @Test
    public void givenLocation_whenGetLocation_thenStatus200() throws Exception {
        this.mvc.perform(get("/locations/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("location name"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("location description"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.parentLocationId").value(IsNull.nullValue()));
    }

    @Test
    public void givenLocation_whenGetLocationWithParent_thenStatus200() throws Exception {
        this.mvc.perform(get("/locations/2").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("another name"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("an other description"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.parentLocationId").value(1));
    }

    @Test
    public void givenLocation_whenPostLocation_thenStatus204() throws Exception {
        String catName = "Test";
        String description = "description";
        LocationDTO dto = new LocationDTO();
        dto.setName(catName);
        dto.setDescription(description);
        dto.setParentLocationId(JsonNullable.of(1));
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();


        this.mvc.perform(post("/inventory/1/locations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                )
                .andExpect(status().isCreated())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(3))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(catName))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(description));
    }

    @Test
    public void givenLocation_whenPutLocation_thenStatus200() throws Exception {
        String catName = "Test";
        String description = "description";
        LocationDTO dto = new LocationDTO();
        dto.setName(catName);
        dto.setDescription(description);
        dto.setParentLocationId(JsonNullable.of(1));
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(put("/locations/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(catName))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(description));
    }

    @Test
    public void givenLocation_whenDeleteLocation_thenStatus200_andThen4040() throws Exception {
        this.mvc.perform(delete("/locations/2").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        this.mvc.perform(get("/locations/2").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
