package ch.heig.pdg.backend.utility;

import ch.heig.pdg.backend.security.services.JWTGeneratorService;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

public abstract class AbstractAuthenticatedIntegrationTest {
    @Autowired
    protected MockMvc mvc;

    @Autowired
    private JWTGeneratorService jwtGeneratorService;
    protected String token = "";

    @BeforeEach
    public void authenticateUser() throws Exception {
        this.token = this.jwtGeneratorService.generateJWT(1);
    }
}
