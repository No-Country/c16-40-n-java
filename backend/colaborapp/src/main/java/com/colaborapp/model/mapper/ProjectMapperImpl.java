package com.colaborapp.model.mapper;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Category;
import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import com.colaborapp.model.User;
import com.colaborapp.repository.CategoryRepository;
import com.colaborapp.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.time.LocalDate;

@Component
public class ProjectMapperImpl implements ProjectMapper {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    @Autowired
    public ProjectMapperImpl(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }



    @Override
    public Project toProjectEntity(String userId, ProjectRequestDTO projectRequestDTO) {
        Assert.notNull(projectRequestDTO, "ProjectRequestDTO object must not be null.");

        User user = userRepository.findByEmail(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        Category category = categoryRepository.findById(projectRequestDTO.categoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + projectRequestDTO.categoryId()));

        Status status = projectRequestDTO.status() != null ? Status.valueOf(projectRequestDTO.status()) : Status.PENDING;
        Double currentAmount = projectRequestDTO.current_amount() != null ? projectRequestDTO.current_amount() : 0.0;
        LocalDate startDate = projectRequestDTO.startDate() != null ? projectRequestDTO.startDate() : LocalDate.now();

        return Project.builder()
                .userId(user)
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

        return ProjectResponseDTO.builder()
                .id(entity.getId())
                .userId(entity.getUserId().getId())
                .categoryId(entity.getCategoryId().getId())
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
