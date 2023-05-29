package ch.heig.pdg.backend.exception.exceptions;

public class ForbiddenOperationException extends RuntimeException {
    public ForbiddenOperationException() {
    }

    public ForbiddenOperationException(String message) {
        super(message);
    }
}
