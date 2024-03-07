package com.colaborapp.service;

import com.colaborapp.model.Role;
import com.colaborapp.model.RoleType;

public interface RoleService {
    Role getRoleByType(RoleType type);
}
