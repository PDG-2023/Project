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
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;

@Service
public class PrivateKeyService {

    @Value("${jwt.privatekey.path}")
    private String privateKeyPath;

    public RSAPrivateKey getPrivateKey() {

        byte[] keyContent;

        if (this.privateKeyPath.startsWith("res:")) {
            Resource resource = new ClassPathResource(privateKeyPath.replaceAll("res:", ""));
            try (InputStream is = resource.getInputStream()) {
                keyContent = is.readAllBytes();
            } catch (IOException e) {
                return null;
            }
        } else {
            try (InputStream is = new FileInputStream(this.privateKeyPath);) {
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

        PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(keyContent);

        try {
            return (RSAPrivateKey) kf.generatePrivate(privateKeySpec);
        } catch (InvalidKeySpecException e) {
            return null;
        }
    }
}
