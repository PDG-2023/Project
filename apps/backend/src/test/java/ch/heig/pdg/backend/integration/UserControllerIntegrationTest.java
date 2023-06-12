package ch.heig.pdg.backend.integration;

import ch.heig.pdg.backend.dto.UserDTO;
import ch.heig.pdg.backend.utility.AbstractAuthenticatedIntegrationTest;
import ch.heig.pdg.backend.utility.IntegrationTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.openapitools.jackson.nullable.JsonNullable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@IntegrationTest
public class UserControllerIntegrationTest extends AbstractAuthenticatedIntegrationTest {
    @Test
    public void whenGetUsers_thenStatus200() throws Exception {
        this.mvc.perform(get("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(header().exists("X-Total"))
                .andExpect(header().string("X-Total", "2"))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].username").value("ptest"));
    }

    @Test
    public void givenUser_whenGetUser_thenStatus200() throws Exception {
        this.mvc.perform(get("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("ptest"));
    }

    @Test
    public void givenInvalidUser_whenGetUser_thenStatus404() throws Exception {
        this.mvc.perform(get("/users/3")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNotFound());
    }

    @Test
    public void givenUser_whenPostUser_thenStatus204() throws Exception {
        String username = "paultest";
        String email = "paul@test.com";
        String fName = "Paulito";
        String lname = "Testino";
        UserDTO dto = new UserDTO();
        dto.setUsername(username);
        dto.setEmail(email);
        dto.setFirstName(fName);
        dto.setLastName(lname);
        dto.setPlainPassword(JsonNullable.of("mysupersecurepassword"));
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value(username))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(email))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value(fName))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value(lname));
    }

    @Test
    public void givenUser_whenPutUser_thenStatus204() throws Exception {
        String username = "paultest";
        String email = "paul@test.com";
        String fName = "Paulito";
        String lname = "Testino";
        UserDTO dto = new UserDTO();
        dto.setUsername(username);
        dto.setEmail(email);
        dto.setFirstName(fName);
        dto.setLastName(lname);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(put("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value(username))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(email))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value(fName))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value(lname));
    }

    @Test
    public void givenUser_whenPutOtherUser_thenStatus401() throws Exception {
        String username = "paultest";
        String email = "paul@test.com";
        String fName = "Paulito";
        String lname = "Testino";
        UserDTO dto = new UserDTO();
        dto.setUsername(username);
        dto.setEmail(email);
        dto.setFirstName(fName);
        dto.setLastName(lname);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        this.mvc.perform(put("/users/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isForbidden());
    }

    @Test
    public void givenCurrentUser_whenGetCurrentUser_thenStatus200_andCorrectData() throws Exception {
        this.mvc.perform(get("/users/current-user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("ptest"));
    }

    @Test
    public void givenUser_whenDeleteUser_thenStatus200_andThen4040() throws Exception {
        this.mvc.perform(delete("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        this.mvc.perform(get("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isNotFound());
    }

    @Test
    public void givenUser_whenDeleteOtherUser_thenStatus401() throws Exception {
        this.mvc.perform(delete("/users/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + this.token)
                )
                .andExpect(status().isForbidden());
    }
}
