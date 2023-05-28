package ch.heig.pdg.backend.security.utils;

public class InvalidJWTException extends Exception{
    public InvalidJWTException(String message) {
        super(message);
    }
}
