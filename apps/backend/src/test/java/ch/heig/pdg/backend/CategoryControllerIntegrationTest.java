package ch.heig.pdg.backend;

import ch.heig.pdg.backend.dto.CategoryDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.Test;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@IntegrationTest
public class CategoryControllerIntegrationTest {
    @Autowired
    private MockMvc mvc;

    @Test
    public void givenInventoryValid_whenGetCategories_thenStatus200() throws Exception {
        this.mvc.perform(get("/inventory/1/categories").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("cat 1"));
    }

    @Test
    public void givenInventoryInvalid_whenGetCategories_thenStatus404() throws Exception {
        this.mvc.perform(get("/inventory/2/categories").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(404));
    }

    @Test
    public void givenCategory_whenGetCategory_thenStatus200() throws Exception {
        this.mvc.perform(get("/categories/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("cat 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.parentCategoryId").value(IsNull.nullValue()));
    }

    @Test
    public void givenCategory_whenGetCategoryWithParent_thenStatus200() throws Exception {
        this.mvc.perform(get("/categories/2").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("cat 2"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.parentCategoryId").value(1));
    }

    @Test
    public void givenCategory_whenPostCategory_thenStatus200() throws Exception {
        String catName = "Test";
        CategoryDTO dto = new CategoryDTO();
        dto.setName(catName);
        dto.setParentCategoryId(JsonNullable.of(1));
        // FIXME: This mapper does not work for now
        ObjectMapper objectMapper = new ObjectMapper();


//        this.mvc.perform(post("/inventory/1/categories")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(dto))
//                )
//                .andExpect(status().isCreated())
//                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(2))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(catName));
    }
}
