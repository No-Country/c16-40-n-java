package com.colaborapp.model.mapper.impl;

import com.colaborapp.dto.*;
import com.colaborapp.model.Project;
import com.colaborapp.model.User;
import com.colaborapp.model.mapper.ProjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;


@Component
public class ProjectMapperImpl implements ProjectMapper {

    @Override
    public Project toEntity(ProjectRequestDTO dto) {
        Assert.notNull(dto, "ProjectRequestDTO object must not be null.");
        return Project.builder()
                .title(dto.title())
                .description(dto.description())
                .image(dto.image())
                .goalAmount(dto.goalAmount())
                .build();
    }

    @Override
    public ProjectResponseDTO toDTO(Project entity) {
        Assert.notNull(entity, "Entity object must not be null.");
        User creator = entity.getCreator();
        return ProjectResponseDTO.builder()
                .id(entity.getId())
                .creator(UserResponseDTO.builder()
                        .id(creator.getId())
                        .name(creator.getName())
                        .lastName(creator.getLastName())
                        .email(creator.getEmail())
                        .build())
                .category(entity.getCategory().getType())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .image(entity.getImage())
                .status(entity.getStatus())
                .goalAmount(entity.getGoalAmount())
                .currentAmount(entity.getCurrentAmount())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .address(AddressResponseDTO.builder()
                        .id(entity.getAddress().getId())
                        .province(entity.getAddress().getProvince())
                        .city(entity.getAddress().getCity())
                        .street(entity.getAddress().getStreet())
                        .number(entity.getAddress().getNumber())
                        .build())
                .build();
    }

    @Override
    public ProjectInfoDTO toBasicDTO(Project entity) {
        return ProjectInfoDTO.builder()
                .id(entity.getId())
                .category(entity.getCategory().getType())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .image(entity.getImage())
                .status(entity.getStatus())
                .goalAmount(entity.getGoalAmount())
                .currentAmount(entity.getCurrentAmount())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .address(AddressResponseDTO.builder()
                        .id(entity.getAddress().getId())
                        .province(entity.getAddress().getProvince())
                        .city(entity.getAddress().getCity())
                        .street(entity.getAddress().getStreet())
                        .number(entity.getAddress().getNumber())
                        .build())
                .build();
    }
}
