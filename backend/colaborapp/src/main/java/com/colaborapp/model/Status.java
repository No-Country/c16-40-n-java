package com.colaborapp.model;

import java.util.InputMismatchException;
import java.util.Set;

public enum Status {
    ACTIVE, FINALIZED, IN_REVIEW, PENDING, DELETED;

    private static final Set<String> states = Set.of(
            "ACTIVE", "FINALIZED", "IN_REVIEW", "PENDING", "DELETED"
    );

    public static Status getStatusFromString(String value) {
        String statusType = value.toUpperCase();
        if (!states.contains(statusType)) {
            throw new InputMismatchException("Unknown Status Type: %s".formatted(value));
        }
        return Status.valueOf(statusType);
    }
}
