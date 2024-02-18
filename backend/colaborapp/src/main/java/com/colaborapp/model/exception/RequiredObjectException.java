package com.colaborapp.model.exception;

public class RequiredObjectException extends RuntimeException {
    public RequiredObjectException(String message) {
        super(message);
    }
}
