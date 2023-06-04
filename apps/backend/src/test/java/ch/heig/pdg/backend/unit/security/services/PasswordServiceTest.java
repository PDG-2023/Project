package ch.heig.pdg.backend.unit.security.services;

import ch.heig.pdg.backend.security.services.PasswordService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class PasswordServiceTest {

    private static PasswordService passwordService;

    @BeforeAll
    public static void setup() {
        passwordService = new PasswordService();
    }

    @Test
    public void testHash() {
        String plainPassword = "password123";
        String hashedPassword = passwordService.hash(plainPassword);
        Assertions.assertNotNull(hashedPassword);
        Assertions.assertNotEquals(plainPassword, hashedPassword);
    }

    @Test
    public void testValidateWithCorrectPassword() {
        String plainPassword = "password123";
        String hashedPassword = passwordService.hash(plainPassword);
        boolean isValid = passwordService.validate(plainPassword, hashedPassword);
        Assertions.assertTrue(isValid);
    }

    @Test
    public void testValidateWithIncorrectPassword() {
        String correctPassword = "password123";
        String hashedPassword = passwordService.hash(correctPassword);
        String incorrectPassword = "wrongpassword";
        boolean isValid = passwordService.validate(incorrectPassword, hashedPassword);
        Assertions.assertFalse(isValid);
    }
}
