package com.colaborapp.utils;

import com.colaborapp.model.Role;
import com.colaborapp.model.RoleType;

import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.Map;
import java.util.Objects;

public class RoleFactory {
    protected Map<RoleType, Role> instances = new HashMap<>();

    public synchronized Role getRole(RoleType type) {
        Role role = instances.get(type);
        if (Objects.nonNull(role)) {
            return role;
        }
        switch (type) {
            case ADMIN: role = Role.builder()
                        .type(RoleType.ADMIN)
                        .build();
                        instances.put(RoleType.ADMIN, role);
                        break;
            case USER: role = Role.builder()
                        .type(RoleType.USER)
                        .build();
                        instances.put(RoleType.USER, role);
                        break;
            default: throw new InputMismatchException("Unknown role type.");
        }
        return role;
    }
}
