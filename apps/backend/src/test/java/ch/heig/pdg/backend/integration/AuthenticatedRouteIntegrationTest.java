package ch.heig.pdg.backend.integration;

import ch.heig.pdg.backend.BasicIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@BasicIntegrationTest
public class AuthenticatedRouteIntegrationTest {
    @Autowired
    private MockMvc mvc;

    /* ==========================================================================================================
     * Inventories routes
     ========================================================================================================== */
    @Test
    public void getInventories() throws Exception {
        this.mvc.perform(get("/inventories").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getInventory() throws Exception {
        this.mvc.perform(get("/inventories/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void putInventory() throws Exception {
        this.mvc.perform(put("/inventories/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void postInventory() throws Exception {
        this.mvc.perform(post("/inventories").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void deleteInventory() throws Exception {
        this.mvc.perform(delete("/inventories/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    /* ==========================================================================================================
     * Categories routes
     ========================================================================================================== */
    @Test
    public void getCategories() throws Exception {
        this.mvc.perform(get("/inventory/1/categories").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getCategory() throws Exception {
        this.mvc.perform(get("/categories/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void putCategory() throws Exception {
        this.mvc.perform(put("/categories/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void postCategory() throws Exception {
        this.mvc.perform(post("/inventory/1/categories").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void deleteCategory() throws Exception {
        this.mvc.perform(delete("/categories/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    /* ==========================================================================================================
     * Locations routes
     ========================================================================================================== */
    @Test
    public void getLocations() throws Exception {
        this.mvc.perform(get("/inventory/1/locations").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getLocation() throws Exception {
        this.mvc.perform(get("/locations/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void putLocation() throws Exception {
        this.mvc.perform(put("/locations/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void postLocation() throws Exception {
        this.mvc.perform(post("/inventory/1/locations").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void deleteLocation() throws Exception {
        this.mvc.perform(delete("/locations/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }


    /* ==========================================================================================================
     * Item models routes
     ========================================================================================================== */
    @Test
    public void getItemModels() throws Exception {
        this.mvc.perform(get("/inventory/1/item-models").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getItemModel() throws Exception {
        this.mvc.perform(get("/item-models/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void putItemModel() throws Exception {
        this.mvc.perform(put("/item-models/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void postItemModel() throws Exception {
        this.mvc.perform(post("/inventory/1/item-models").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void deleteItemModel() throws Exception {
        this.mvc.perform(delete("/item-models/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    /* ==========================================================================================================
     * Items routes
     ========================================================================================================== */
    @Test
    public void getItems() throws Exception {
        this.mvc.perform(get("/items").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getItem() throws Exception {
        this.mvc.perform(get("/items/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void putItem() throws Exception {
        this.mvc.perform(put("/items/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void postItem() throws Exception {
        this.mvc.perform(post("/items").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void deleteItem() throws Exception {
        this.mvc.perform(delete("/items/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}
