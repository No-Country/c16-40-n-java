package com.colaborapp.model.mapper.impl;

import com.colaborapp.dto.UserProjectsDTO;
import com.colaborapp.dto.UserRequestDTO;
import com.colaborapp.dto.UserResponseDTO;
import com.colaborapp.model.User;
import com.colaborapp.model.mapper.ProjectMapper;
import com.colaborapp.model.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapperImpl implements UserMapper {
    private final ProjectMapper projectMapper;

    @Override
    public User toEntity(UserRequestDTO dto) {
        return User.builder()
                .name(dto.name())
                .lastName(dto.lastName())
                .phoneNumber(dto.phoneNumber())
                .email(dto.email())
                .build();
    }

    @Override
    public UserResponseDTO toDTO(User entity) {
        return UserResponseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .lastName(entity.getLastName())
                .email(entity.getEmail())
                .phoneNumber(entity.getPhoneNumber())
                .projects(UserProjectsDTO.builder()
                        .asOwner(entity.getProjects()
                                .stream()
                                .map(projectMapper::toBasicDTO)
                                .collect(Collectors.toSet()))
                        .asVolunteer(entity.getVolunteeringList()
                                .stream()
                                .map(volunteering -> projectMapper.toDTO(volunteering.getProject()))
                                .collect(Collectors.toSet()))
                        .build())
                .build();
    }
}
