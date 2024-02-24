package com.colaborapp.service.impl;

import com.colaborapp.model.Role;
import com.colaborapp.model.exception.RequiredObjectException;
import com.colaborapp.repository.RoleRepository;
import com.colaborapp.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public Role createRole(Role role) {
        if (Objects.isNull(role)) {
            throw new RequiredObjectException("Role is null.");
        }
        return roleRepository.save(role);
    }
}
