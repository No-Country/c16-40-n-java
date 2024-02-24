package com.colaborapp.service.impl;

import com.colaborapp.dto.UserRequestDTO;
import com.colaborapp.model.Role;
import com.colaborapp.model.RoleType;
import com.colaborapp.model.User;
import com.colaborapp.model.exception.RequiredObjectException;
import com.colaborapp.model.mapper.UserMapper;
import com.colaborapp.repository.UserRepository;
import com.colaborapp.service.RoleService;
import com.colaborapp.service.UserService;
import com.colaborapp.utils.RoleFactory;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final RoleFactory roleFactory = new RoleFactory();
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;
    private final RoleService roleService;

    @Override
    public void userRegistration(UserRequestDTO registrationRequest) {
        if (Objects.isNull(registrationRequest)) {
            throw new RequiredObjectException("User registration denied. Must provide valid data.");
        }
        if (userRepository.existsByEmail(registrationRequest.email())) {
            throw new EntityExistsException("Error: Try with a different email.");
        }
        User user = userMapper.toEntity(registrationRequest);
        user.setPassword(encoder.encode(registrationRequest.password()));
        // by default role type will be USER
        Role role = roleFactory.getRole(RoleType.USER);
        role = roleService.createRole(role);
        user.setRole(role);
        user.setEnable(true); // when user is created, is enabled to use the platform
        userRepository.save(user);
    }

    @Override
    public User getUserByEmailFromDatabase(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for email %s".formatted(email)));
    }
}
