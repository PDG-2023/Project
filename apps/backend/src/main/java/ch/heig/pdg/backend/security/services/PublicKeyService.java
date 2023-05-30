package ch.heig.pdg.backend.security.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;

@Service
public class PublicKeyService {

    @Value("${jwt.publickey.path}")
    private String publicKeyPath;

    public RSAPublicKey getPublicKey() {

        byte[] keyContent;
        if (this.publicKeyPath.startsWith("res:")) {
            Resource resource = new ClassPathResource(publicKeyPath.replaceAll("res:", ""));
            try (InputStream is = resource.getInputStream()) {
                keyContent = is.readAllBytes();
            } catch (IOException e) {
                return null;
            }
        } else {
            try (InputStream is = new FileInputStream(this.publicKeyPath);) {
                keyContent = is.readAllBytes();
            } catch (IOException e) {
                return null;
            }
        }

        KeyFactory kf;
        try {
            kf = KeyFactory.getInstance("RSA");
        } catch (NoSuchAlgorithmException e) {
            return null;
        }


        X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(keyContent);

        try {
            return (RSAPublicKey) kf.generatePublic(publicKeySpec);
        } catch (InvalidKeySpecException e) {
            return null;
        }
    }
}
