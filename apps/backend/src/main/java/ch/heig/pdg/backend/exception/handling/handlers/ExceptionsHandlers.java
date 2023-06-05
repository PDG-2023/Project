package ch.heig.pdg.backend.exception.handling.handlers;

import ch.heig.pdg.backend.exception.exceptions.*;
import ch.heig.pdg.backend.exception.handling.JSONErrorMessage;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;

@ControllerAdvice
public class ExceptionsHandlers extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException exception, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return new ResponseEntity<>(
                new JSONErrorMessage().addErrorsItem("Could not parse HTTP body: " + exception.getMessage()),
                HttpStatusCode.valueOf(400)
        );
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return new ResponseEntity<>(
                this.processFieldErrors(exception.getFieldErrors()),
                HttpStatusCode.valueOf(400)
        );
    }

    private JSONErrorMessage processFieldErrors(List<FieldError> fieldErrors) {
        JSONErrorMessage jsonErrorMessage = new JSONErrorMessage();
        for (FieldError fieldError: fieldErrors) {
            jsonErrorMessage.addErrorsItem(String.format("%s: %s", fieldError.getField(), fieldError.getDefaultMessage()));
        }
        return jsonErrorMessage;
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<JSONErrorMessage> handleDataAccessException(DataAccessException exception) {

        HttpStatusCode httpStatusCode;
        JSONErrorMessage jsonErrorMessage = new JSONErrorMessage();
        if (exception instanceof DataIntegrityViolationException) {
            if (exception instanceof DuplicateKeyException) {
                httpStatusCode = HttpStatusCode.valueOf(409);
                jsonErrorMessage.addErrorsItem("Duplicate entry");
            } else {
                httpStatusCode = HttpStatusCode.valueOf(400);
                jsonErrorMessage.addErrorsItem("Data integrity violation: " + exception.getMessage());
            }
        } else {
            httpStatusCode = HttpStatusCode.valueOf(500);
            jsonErrorMessage.addErrorsItem("Database error");
        }
        return new ResponseEntity<>(
                jsonErrorMessage,
                httpStatusCode
        );
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<JSONErrorMessage> handleNoSuchElementFoundException(NotFoundException exception) {
        return new ResponseEntity<>(
                HttpStatusCode.valueOf(404)
        );
    }

    @ExceptionHandler(InternalServerErrorException.class)
    public ResponseEntity<JSONErrorMessage> handleInternalServerErrorException(InternalServerErrorException exception) {
        return new ResponseEntity<>(
                new JSONErrorMessage().addErrorsItem(exception.getMessage()),
                HttpStatusCode.valueOf(500)
        );
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<JSONErrorMessage> handleBadRequestException(BadRequestException exception) {
        return new ResponseEntity<>(
                new JSONErrorMessage().addErrorsItem(exception.getMessage()),
                HttpStatusCode.valueOf(400)
        );
    }

    @ExceptionHandler(ForbiddenOperationException.class)
    public ResponseEntity<JSONErrorMessage> handleForbiddenOperationException(ForbiddenOperationException exception) {
        return new ResponseEntity<>(
                new JSONErrorMessage().addErrorsItem(exception.getMessage()),
                HttpStatusCode.valueOf(403)
        );
    }

    @ExceptionHandler(IllegalBusinessStateException.class)
    public ResponseEntity<JSONErrorMessage> handleIllegalBusinessStateException(IllegalBusinessStateException exception) {
        return new ResponseEntity<>(
                new JSONErrorMessage().addErrorsItem(exception.getMessage()),
                HttpStatusCode.valueOf(409)
        );
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<JSONErrorMessage> handleUnauthorizedException(UnauthorizedException exception) {
        return new ResponseEntity<>(
                new JSONErrorMessage().addErrorsItem(exception.getMessage()),
                HttpStatusCode.valueOf(401)
        );
    }
}
