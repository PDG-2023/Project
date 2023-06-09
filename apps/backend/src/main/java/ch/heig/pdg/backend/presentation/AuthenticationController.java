package ch.heig.pdg.backend.presentation;

import ch.heig.pdg.backend.api.JwtApi;
import ch.heig.pdg.backend.dto.CredentialsDTO;
import ch.heig.pdg.backend.dto.JWTDTO;
import ch.heig.pdg.backend.entities.User;
import ch.heig.pdg.backend.exception.exceptions.UnauthorizedException;
import ch.heig.pdg.backend.repositories.UserRepository;
import ch.heig.pdg.backend.security.services.JWTGeneratorService;
import ch.heig.pdg.backend.security.services.JWTValidatorService;
import ch.heig.pdg.backend.security.services.PasswordService;
import ch.heig.pdg.backend.security.utils.InvalidJWTException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController implements JwtApi {
    private final UserRepository userRepository;
    private final JWTGeneratorService jwtGeneratorService;
    private final JWTValidatorService jwtValidatorService;
    private final PasswordService passwordService;

    public AuthenticationController(UserRepository userRepository, JWTGeneratorService jwtGeneratorService, JWTValidatorService jwtValidatorService, PasswordService passwordService) {
        this.userRepository = userRepository;
        this.jwtGeneratorService = jwtGeneratorService;
        this.jwtValidatorService = jwtValidatorService;
        this.passwordService = passwordService;
    }

    @Override
    public ResponseEntity<JWTDTO> getToken(CredentialsDTO credentialsDTO) {
        User user = this.userRepository.findByUsernameOrEmail(credentialsDTO.getUsername(), credentialsDTO.getUsername()).orElseThrow(UnauthorizedException::new);

        if (!this.passwordService.validate(credentialsDTO.getPassword(), user.getPassword())) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(401));
        }

        String jwt;
        try {
            jwt = this.jwtGeneratorService.generateJWT(user.getId());
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
        JWTDTO jwtDataTransferObject = new JWTDTO();
        jwtDataTransferObject.setToken(jwt);
        return ResponseEntity.ok(jwtDataTransferObject);
    }

    @Override
    public ResponseEntity<Void> validateToken(String authorization) {
        String[] authorizationHeaderSplit = authorization.split(" ");
        if (authorizationHeaderSplit.length != 2) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(400));
        }
        String jwt = authorizationHeaderSplit[1];
        try {
            this.jwtValidatorService.validateJWT(jwt);
            return new ResponseEntity<>(HttpStatusCode.valueOf(204));

        } catch (InvalidJWTException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }
}
