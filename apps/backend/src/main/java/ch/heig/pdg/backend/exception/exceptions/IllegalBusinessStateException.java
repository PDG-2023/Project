package ch.heig.pdg.backend.exception.exceptions;

public class IllegalBusinessStateException extends RuntimeException {
    public IllegalBusinessStateException() {
    }

    public IllegalBusinessStateException(String message) {
        super(message);
    }
}
