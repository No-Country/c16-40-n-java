package com.colaborapp.service.impl;

import com.colaborapp.dto.UserRequestDTO;
import com.colaborapp.dto.UserResponseDTO;
import com.colaborapp.dto.VolunteerRequestDTO;
import com.colaborapp.model.Project;
import com.colaborapp.model.Role;
import com.colaborapp.model.RoleType;
import com.colaborapp.model.User;
import com.colaborapp.model.mapper.UserMapper;
import com.colaborapp.repository.UserRepository;
import com.colaborapp.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Objects;

@Service
@RequiredArgsConstructor(onConstructor_ = @Lazy)
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;
    private final RoleService roleService;
    private final ProjectService projectService;
    private final VolunteerService volunteerService;
    private final AuthService authService;

    @Override
    public void userRegistration(UserRequestDTO registrationRequest) {
        if (Objects.isNull(registrationRequest)) {
            throw new RuntimeException("User registration denied. Must provide valid data."); // TODO: change me
        }
        if (userRepository.existsByEmail(registrationRequest.email())) {
            throw new RuntimeException("Error: Try with a different email."); // TODO: change me
        }
        User user = userMapper.toEntity(registrationRequest);
        user.setPassword(encoder.encode(registrationRequest.password()));
        // by default role type will be USER
        Role role = roleService.getRoleByType(RoleType.USER);
        user.setRole(role);
        user.setEnable(true); // when user is created, is enabled to use the platform
        userRepository.save(user);
    }

    @Override
    public void beProjectVolunteer(VolunteerRequestDTO request) {
        User volunteer = getUserByEmailFromDatabase(authService.getAuthenticatedUsername());
        Project project = projectService.getProjectEntityById(request.projectId());
        // checks if the volunteer is the same as the project owner
        if (volunteer.equals(project.getCreator())) {
            throw new RuntimeException("You are trying to volunteer for one of your projects."); // TODO: change me
        }
        // set or update user phone number
        volunteer.setPhoneNumber(request.volunteerPhoneNumber());
        volunteer = userRepository.save(volunteer);
        volunteerService.createVolunteer(volunteer, project);
    }

    @Override
    public User getUserByEmailFromDatabase(String email) {
        if (Objects.isNull(email) || email.trim().isEmpty()) {
            throw new RuntimeException("The current User email is empty or null."); // TODO: change me
        }
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found for email %s".formatted(email))); // TODO: change me
    }

    @Override
    public UserResponseDTO fetchUserDataWithRelatedProjects(Long id) {
        User user = getUserByEmailFromDatabase(authService.getAuthenticatedUsername());
        Assert.notNull(id, "User ID can't be null.");
        if (!user.getId().equals(id)) {
            throw new RuntimeException("Trying to fetch data from not logged user."); // TODO: change me
        }
        return userMapper.toDTO(user);
    }
}
