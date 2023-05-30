package ch.heig.pdg.backend.security.services;

import ch.heig.pdg.backend.security.KeyPair;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class JWTGeneratorService {

    private final PublicKeyService publicKeyService;
    private final PrivateKeyService privateKeyService;

    public JWTGeneratorService(PublicKeyService publicKeyService, PrivateKeyService privateKeyService) {
        this.publicKeyService = publicKeyService;
        this.privateKeyService = privateKeyService;
    }

    public String generateJWT(Integer userId) throws Exception {
        KeyPair keyPair = new KeyPair(
                this.publicKeyService.getPublicKey(),
                this.privateKeyService.getPrivateKey()
        );
        try {
            Algorithm algorithm = Algorithm.RSA512(keyPair.publicKey(), keyPair.privateKey());

            return JWT.create()
                    .withIssuer("BrokerIT")
                    .withSubject(userId.toString())
                    .withExpiresAt(Date.from(LocalDateTime.now().plusDays(1).atZone(ZoneId.systemDefault()).toInstant()))
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new Exception("Could not generate JWT");
        }
    }
}
