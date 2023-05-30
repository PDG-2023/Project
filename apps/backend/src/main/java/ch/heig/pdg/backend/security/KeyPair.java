package ch.heig.pdg.backend.security;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

public record KeyPair(RSAPublicKey publicKey, RSAPrivateKey privateKey) {
}
