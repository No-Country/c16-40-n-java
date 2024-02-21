package com.colaborapp.controller;

import com.colaborapp.model.exception.HttpCodeResponse;
import com.colaborapp.model.exception.RequiredObjectException;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.lang.NonNull;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

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
     * a proper message.
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
    public ResponseEntity<ProblemDetail> handleExpiredJwt(HttpMessageNotReadableException ex) {
        ProblemDetail details = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        details.setTitle(HttpCodeResponse.EXPIRED_TOKEN.name());
        details.setDetail(ex.getMessage());
        return ResponseEntity.status(details.getStatus()).body(details);
    }

    /*
     * Handle UserNotFoundException whe the user is not present.
     * */
    @ExceptionHandler(value = UsernameNotFoundException.class)
    public ResponseEntity<ProblemDetail> handleUsernameNotFound(UsernameNotFoundException ex) {
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
}
