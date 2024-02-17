package com.colaborapp.model.mapper;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Category;
import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import com.colaborapp.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.time.LocalDate;

@Component
public class ProjectMapperImpl implements ProjectMapper {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Project toProjectEntity(ProjectRequestDTO projectRequestDTO) {
        Assert.notNull(projectRequestDTO, "ProjectRequestDTO object must not be null.");

        Category category = categoryRepository.findById(projectRequestDTO.categoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + projectRequestDTO.categoryId()));

        Status status = projectRequestDTO.status() != null ? Status.valueOf(projectRequestDTO.status()) : Status.PENDING;
        Double currentAmount = projectRequestDTO.current_amount() != null ? projectRequestDTO.current_amount() : 0.0;
        LocalDate startDate = projectRequestDTO.startDate() != null ? projectRequestDTO.startDate() : LocalDate.now();

        return Project.builder()
                .categoryId(category)
                .status(status)
                .title(projectRequestDTO.title())
                .description(projectRequestDTO.description())
                .image(projectRequestDTO.image())
                .goalAmount(projectRequestDTO.goalAmount())
                .currentAmount(currentAmount)
                .startDate(startDate)
                .endDate(projectRequestDTO.endDate())
                .build();
    }

    @Override
    public ProjectResponseDTO toProjectResponseDto(Project entity) {
        Assert.notNull(entity, "Entity object must not be null.");

        Category category = categoryRepository.findById(entity.getCategoryId().getId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + entity.getCategoryId()));

        return ProjectResponseDTO.builder()
                .id(entity.getId())
                // .userId(entity.getUserId())
                .categoryId(category.getId())
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

        Category category = categoryRepository.findById(projectRequestDTO.categoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + projectRequestDTO.categoryId()));

        return Project.builder()
                .id(existingProject.getId())
                .categoryId(category)
                .status(Status.valueOf(projectRequestDTO.status()))
                .title(projectRequestDTO.title())
                .description(projectRequestDTO.description())
                .image(projectRequestDTO.image())
                .goalAmount(projectRequestDTO.goalAmount())
                .currentAmount(projectRequestDTO.current_amount())
                .startDate(projectRequestDTO.startDate())
                .endDate(projectRequestDTO.endDate())
                .build();
    }


}
