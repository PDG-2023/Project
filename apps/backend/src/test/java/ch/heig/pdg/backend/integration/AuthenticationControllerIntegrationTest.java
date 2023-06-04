package ch.heig.pdg.backend.integration;

import ch.heig.pdg.backend.dto.CredentialsDTO;
import ch.heig.pdg.backend.dto.JWTDTO;
import ch.heig.pdg.backend.utility.IntegrationTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@IntegrationTest
public class AuthenticationControllerIntegrationTest {
    @Autowired
    private MockMvc mvc;

    @Test
    public void whenCredentials_thenJwtToekn_ansStatus200() throws Exception {
        CredentialsDTO credentials = new CredentialsDTO();
        credentials.setPassword("password");
        credentials.setUsername("ptest");
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();

        MvcResult result = this.mvc.perform(post("/authentication/getToken")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(credentials))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        String content = result.getResponse().getContentAsString();
        JWTDTO jwt = mapper.readValue(content, JWTDTO.class);
        String token = jwt.getToken();

        this.mvc.perform(post("/authentication/validateToken")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + token)
                )
                .andExpect(status().isNoContent());
    }
}
