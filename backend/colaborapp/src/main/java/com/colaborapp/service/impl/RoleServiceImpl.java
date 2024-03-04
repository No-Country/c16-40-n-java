package com.colaborapp.service.impl;

import com.colaborapp.model.Role;
import com.colaborapp.model.RoleType;
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
    public Role getRoleByType(RoleType type) {
        if (Objects.isNull(type)) {
            throw new RuntimeException("Role is null."); // TODO: change me
        }
        return roleRepository.findByType(type)
                .orElseThrow(() -> new RuntimeException("Role type '%s' not found.".formatted(type))); // TODO: change me
    }
}
