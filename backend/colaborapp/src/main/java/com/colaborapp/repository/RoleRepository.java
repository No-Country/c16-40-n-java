package com.colaborapp.repository;

import com.colaborapp.model.Role;
import com.colaborapp.model.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByType(RoleType type);
}
