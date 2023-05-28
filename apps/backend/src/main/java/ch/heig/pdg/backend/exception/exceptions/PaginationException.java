package ch.heig.pdg.backend.exception.exceptions;


public class PaginationException extends BadRequestException {
    public PaginationException(String message){
        super(message);
    }
}
