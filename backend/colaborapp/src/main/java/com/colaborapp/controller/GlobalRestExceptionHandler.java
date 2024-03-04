package com.colaborapp.controller;

import com.colaborapp.model.exception.HttpCodeResponse;
import com.colaborapp.model.exception.RequiredObjectException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.lang.NonNull;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.DateTimeException;
import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.Map;

@RestControllerAdvice
public class GlobalRestExceptionHandler extends ResponseEntityExceptionHandler {
    /*
     * Handle errors that can be caused by annotations of Jakarta Validation API.
     * */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(@NonNull MethodArgumentNotValidException ex,
                                                                  @NonNull HttpHeaders headers,
                                                                  @NonNull HttpStatusCode status,
                                                                  @NonNull WebRequest request) {
        // collect the errors from the payload
        Map<String, Object> errors = new HashMap<>();
        ex.getBindingResult()
                .getAllErrors()
                .forEach(error -> {
                    String fieldName = ((FieldError) error).getField();
                    String message = error.getDefaultMessage();
                    errors.put(fieldName, message);
                });
        ProblemDetail details = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        details.setDetail("The required payload values are not present or the data is in an invalid format.");
        details.setTitle(HttpCodeResponse.INVALID_PAYLOAD_PROPERTY.name());
        details.setProperties(errors);
        return ResponseEntity.status(details.getStatus()).body(details);
    }

    /*
     * If the payload of any endpoint of the API is required, this method handle it trowing
     * a proper content.
     * */
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                                  @NonNull HttpHeaders headers,
                                                                  @NonNull HttpStatusCode status,
                                                                  @NonNull WebRequest request) {
        ProblemDetail details = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        details.setDetail(ex.getMessage());
        details.setTitle(HttpCodeResponse.INVALID_REQUIRED_PAYLOAD.name());
        return ResponseEntity.status(details.getStatus()).body(details);
    }

    /*
     * Handle token expiration.
     * */
    @ExceptionHandler(value = ExpiredJwtException.class)
    public ResponseEntity<ProblemDetail> handleExpiredJwt(ExpiredJwtException ex, @NonNull WebRequest request) {
        ProblemDetail details = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        details.setTitle(HttpCodeResponse.EXPIRED_TOKEN.name());
        details.setDetail(ex.getMessage());
        return ResponseEntity.status(details.getStatus()).body(details);
    }

    /*
     * Handle UserNotFoundException and EntityNotFoundException whe the user is not present in the database or
     * the concrete entity is not present in the database.
     * */
    @ExceptionHandler(value = {UsernameNotFoundException.class, EntityNotFoundException.class})
    public ResponseEntity<ProblemDetail> handleUsernameNotFound(RuntimeException ex) {
        ProblemDetail details = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        details.setTitle(HttpCodeResponse.RESOURCE_NOT_FOUND.name());
        details.setDetail(ex.getMessage());
        return ResponseEntity.status(details.getStatus()).body(details);
    }

    /*
     * Handle RequiredObjectException and InputMismatchException
     * when a sertain required data is not present to complete the request or
     * when an unknown value or data is passed as argument.
     * */
    @ExceptionHandler(value = {RequiredObjectException.class, InputMismatchException.class})
    public ResponseEntity<ProblemDetail> handleRequiredObject(RuntimeException ex) {
        ProblemDetail details = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        details.setTitle(HttpCodeResponse.INVALID_ARGUMENT.name());
        details.setDetail(ex.getMessage());
        return ResponseEntity.status(details.getStatus()).body(details);
    }

    /*
     * Handle EntityExistsException when try to create the same entity object.
     * */
    @ExceptionHandler(value = EntityExistsException.class)
    public ResponseEntity<ProblemDetail> handleEntityExists(EntityExistsException ex) {
        ProblemDetail details = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        details.setTitle(HttpCodeResponse.DUPLICATED_RESOURCE.name());
        details.setDetail(ex.getMessage());
        return ResponseEntity.status(details.getStatus()).body(details);
    }

    /*
     * Handle DateTimeException when the date is invalid or the re problems between dates.
     * */
    @ExceptionHandler(value = DateTimeException.class)
    public ResponseEntity<ProblemDetail> handleDateTime(DateTimeException ex) {
        ProblemDetail details = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        details.setTitle(HttpCodeResponse.INVALID_ARGUMENT.name());
        details.setDetail(ex.getMessage());
        return ResponseEntity.status(details.getStatus()).body(details);
    }

    /*
    * Handle RequestRejectedException when there is a problem processing the request.
    * */
    @ExceptionHandler(value = RequestRejectedException.class)
    public ResponseEntity<ProblemDetail> handleRequestRejected(RequestRejectedException ex, WebRequest request) {
        ProblemDetail details = ProblemDetail.forStatus(HttpStatus.FORBIDDEN);
        details.setTitle(HttpCodeResponse.ACTION_DENIED.name());
        details.setDetail(ex.getMessage());
        return ResponseEntity.status(details.getStatus()).body(details);
    }
}
