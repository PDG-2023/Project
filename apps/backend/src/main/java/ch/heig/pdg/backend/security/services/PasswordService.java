package ch.heig.pdg.backend.security.services;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {
    private static final Argon2PasswordEncoder encoder = new Argon2PasswordEncoder(32, 64, 1, 15 * 1024, 2);

    /**
     * Hash a string using the Argon2 hashing function
     *
     * @param plain string to hash
     * @return
     */
    public String hash(String plain) {
        return encoder.encode(plain);
    }

    /**
     * Check if the message match with a hash
     *
     * @param plain message to check
     * @param hash  to be compared
     * @return true is success
     */
    public boolean validate(String plain, String hash) {
        return encoder.matches(plain, hash);
    }
}
