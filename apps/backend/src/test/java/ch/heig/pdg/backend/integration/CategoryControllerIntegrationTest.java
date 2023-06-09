package ch.heig.pdg.backend.integration;

import ch.heig.pdg.backend.dto.CategoryDTO;
import ch.heig.pdg.backend.utility.AbstractAuthenticatedIntegrationTest;
import ch.heig.pdg.backend.utility.IntegrationTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.Test;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@IntegrationTest
public class CategoryControllerIntegrationTest extends AbstractAuthenticatedIntegrationTest {
    @Test
    public void givenInventoryValid_whenGetCategories_thenStatus200() throws Exception {
        this.mvc.perform(get("/inventory/1/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(header().exists("X-Total"))
                .andExpect(header().string("X-Total", "2"))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("cat 1"));
    }

    @Test
    public void givenInventoryInvalid_whenGetCategories_thenStatus404() throws Exception {
        this.mvc.perform(get("/inventory/2/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().is(404));
    }

    @Test
    public void givenCategory_whenGetCategory_thenStatus200() throws Exception {
        this.mvc.perform(get("/categories/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("cat 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.parentCategoryId").value(IsNull.nullValue()));
    }

    @Test
    public void givenCategory_whenGetCategoryWithParent_thenStatus200() throws Exception {
        this.mvc.perform(get("/categories/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("cat 2"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.parentCategoryId").value(1));
    }

    @Test
    public void givenCategory_whenPostCategory_thenStatus204() throws Exception {
        String catName = "Test";
        CategoryDTO dto = new CategoryDTO();
        dto.setName(catName);
        dto.setParentCategoryId(JsonNullable.of(1));
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();


        this.mvc.perform(post("/inventory/1/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                        .content(objectMapper.writeValueAsString(dto))
                )
                .andExpect(status().isCreated())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(3))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(catName));
    }

    @Test
    public void givenCategory_whenPutCategory_thenStatus200() throws Exception {
        String catName = "Test";
        CategoryDTO dto = new CategoryDTO();
        dto.setName(catName);
        dto.setParentCategoryId(JsonNullable.of(1));
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(put("/categories/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                        .content(objectMapper.writeValueAsString(dto))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(catName));
    }

    @Test
    public void givenCategory_whenDeleteCategory_thenStatus200_andThen4040() throws Exception {
        this.mvc.perform(delete("/categories/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        this.mvc.perform(get("/categories/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNotFound());
    }
}
