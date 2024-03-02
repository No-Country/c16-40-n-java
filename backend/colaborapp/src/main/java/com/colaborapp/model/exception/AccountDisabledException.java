package com.colaborapp.model.exception;

public class AccountDisabledException extends RuntimeException {
    public AccountDisabledException(String messaje) {
        super(messaje);
    }
}
