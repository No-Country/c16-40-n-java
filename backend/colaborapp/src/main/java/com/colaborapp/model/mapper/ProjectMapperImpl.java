package com.colaborapp.model.mapper;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Category;
import com.colaborapp.model.Project;
import com.colaborapp.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class ProjectMapperImpl implements ProjectMapper {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Project toProjectEntity(ProjectRequestDTO projectRequestDTO) {
        Assert.notNull(projectRequestDTO, "ProjectRequestDTO object must not be null.");

        Category category = categoryRepository.findById(projectRequestDTO.categoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + projectRequestDTO.categoryId()));

        return Project.builder()
                .categoryId(category)
                .title(projectRequestDTO.title())
                .description(projectRequestDTO.description())
                .image(projectRequestDTO.image())
                .goalAmount(projectRequestDTO.goalAmount())
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
                .status(String.valueOf(entity.getStatus()))
                .goalAmount(entity.getGoalAmount())
                .currentAmount(entity.getCurrentAmount())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .build();
    }

}
