package com.colaborapp.model.mapper;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.time.LocalDate;


@Component
public class ProjectMapperImpl implements ProjectMapper {

    @Override
    public Project toProjectEntity(ProjectRequestDTO projectRequestDTO) {
        Assert.notNull(projectRequestDTO, "ProjectRequestDTO object must not be null.");

        Status status = projectRequestDTO.status() != null ? Status.valueOf(projectRequestDTO.status()) : Status.PENDING;
        Double currentAmount = projectRequestDTO.current_amount() != null ? projectRequestDTO.current_amount() : 0.0;
        LocalDate startDate = projectRequestDTO.startDate() != null ? projectRequestDTO.startDate() : LocalDate.now();

        return Project.builder()
                .title(projectRequestDTO.title())
                .status(status)
                .startDate(startDate)
                .currentAmount(currentAmount)
                .description(projectRequestDTO.description())
                .image(projectRequestDTO.image())
                .goalAmount(projectRequestDTO.goalAmount())
                .endDate(projectRequestDTO.endDate())
                .build();
    }

    @Override
    public ProjectResponseDTO toProjectResponseDto(Project entity) {
        Assert.notNull(entity, "Entity object must not be null.");

        return ProjectResponseDTO.builder()
                .id(entity.getId())
                .creator(entity.getCreator().getEmail())
                .category(String.valueOf(entity.getCategory().getName()))
                .title(entity.getTitle())
                .description(entity.getDescription())
                .image(entity.getImage())
                .status(entity.getStatus().name())
                .goalAmount(entity.getGoalAmount())
                .currentAmount(entity.getCurrentAmount())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .build();
    }
    @Override
    public Project toProjectEntityForUpdate(Project existingProject, ProjectRequestDTO projectRequestDTO) {
        Assert.notNull(existingProject, "ExistingProject object must not be null.");
        Assert.notNull(projectRequestDTO, "ProjectRequestDTO object must not be null.");

        return Project.builder()
                .id(existingProject.getId())
                .status(Status.valueOf(projectRequestDTO.status()))
                .title(projectRequestDTO.title())
                .description(projectRequestDTO.description())
                .image(projectRequestDTO.image())
                .goalAmount(projectRequestDTO.goalAmount())
                .currentAmount(projectRequestDTO.current_amount())
                .startDate(existingProject.getStartDate())
                .endDate(projectRequestDTO.endDate())
                .build();
    }
}
