package com.colaborapp.model;

public enum RoleType {
    ADMIN, USER;

    private static final String PREFIX = "ROLE_";

    public String getFullRoleName() {
        return PREFIX + this.name();
    }
}
