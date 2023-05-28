package ch.heig.pdg.backend.security.services;


import ch.heig.pdg.backend.security.utils.InvalidJWTException;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;


@Service
public class JWTValidatorService {

    private final PublicKeyService publicKeyService;

    public JWTValidatorService(PublicKeyService publicKeyService) {
        this.publicKeyService = publicKeyService;
    }

    public DecodedJWT validateJWT(String rawJWT) throws InvalidJWTException {
        DecodedJWT decodedJWT;
        try {
            Algorithm algorithm = Algorithm.RSA512(this.publicKeyService.getPublicKey());
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("BrokerIT")
                    .build();

            decodedJWT = verifier.verify(rawJWT);
        } catch (JWTVerificationException exception) {
            throw new InvalidJWTException("Could not decode JWT");
        }
        if(decodedJWT.getSubject() == null){
            throw new InvalidJWTException("No subject");
        }
        return decodedJWT;
    }

}
