package com.colaborapp.service.impl;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.*;
import com.colaborapp.model.exception.RequiredObjectException;
import com.colaborapp.model.mapper.ProjectMapper;
import com.colaborapp.repository.ProjectRepository;
import com.colaborapp.service.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final AddressService addressService;
    private final ProjectMapper projectMapper;
    private final UserService userService;
    private final CategoryService categoryService;
    private final AuthService authService;

    @Override
    public ProjectResponseDTO createProject(ProjectRequestDTO request) {
        User user = userService.getUserByEmailFromDatabase(authService.getAuthenticatedUsername());
        CategoryType categoryType = CategoryType.getCategoryTypeFromString(request.categoryType());
        Address address = addressService.createNewAddress(request.address());
        Category category = categoryService.getCategoryByType(categoryType);
        Project project = projectMapper.toEntity(request);
        project.setCreator(user);
        project.setCategory(category);
        project.setStartDate(LocalDate.now());
        project.setEndDate(request.endDate());
        project.setStatus(Status.ACTIVE);
        project.setCurrentAmount(0.0);
        project.setAddress(address);
        projectRepository.save(project);
        return projectMapper.toDTO(project);
    }

    @Override
    public ProjectResponseDTO updateProject(Long id, ProjectRequestDTO updateRequest) {
        Project projectToUpdate = getProjectEntityById(id);
        if (!projectToUpdate.getCreator().getEmail().equals(authService.getAuthenticatedUsername())) {
            throw new RequestRejectedException("Trying to modify a not owned project.");
        }
        if (Objects.nonNull(updateRequest.categoryType()) && !updateRequest.categoryType().trim().isEmpty()) {
            CategoryType categoryType = CategoryType.getCategoryTypeFromString(updateRequest.categoryType());
            Category category = categoryService.getCategoryByType(categoryType);
            projectToUpdate.setCategory(category);
        }
        if (Objects.nonNull(updateRequest.status()) && !updateRequest.status().trim().isEmpty()) {
            Status newState = Status.getStatusFromString(updateRequest.status());
            projectToUpdate.setStatus(newState);
        }
        projectToUpdate.setTitle(updateRequest.title());
        projectToUpdate.setImage(updateRequest.image());
        projectToUpdate.setDescription(updateRequest.description());
        projectToUpdate.setGoalAmount(updateRequest.goalAmount());
        projectToUpdate.setEndDate(updateRequest.endDate());
        // updates the Address info
        addressService.updateAddress(projectToUpdate.getAddress(), updateRequest.address());
        return projectMapper.toDTO(projectRepository.save(projectToUpdate));
    }

    @Override
    public ProjectResponseDTO getProjectById(Long id) {
        return projectRepository.findById(id).map(projectMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));

    }

    @Override
    public List<ProjectResponseDTO> getAllProjects() {
        return projectRepository.findAll().stream().map(projectMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponseDTO> getAllActiveProjects() {
        return projectRepository.findAllByStatusAndEndDateAfter(Status.ACTIVE, LocalDate.now())
                .stream().map(projectMapper::toDTO).toList();
    }

    @Override
    public Project getProjectEntityById(Long id) {
        if (Objects.isNull(id)) {
            throw new RequiredObjectException("The current Project ID is empty or null.");
        }
        return projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found for ID: %s".formatted(id)));
    }

    @Override
    public void deleteProject(Long id) {
        if (Objects.isNull(id)) {
            throw new RequiredObjectException("Required Project ID is null.");
        }
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: %s".formatted(id)));
        if (!project.getCreator().getEmail().equals(authService.getAuthenticatedUsername())) {
            throw new RequestRejectedException("Trying to modify a not owned project.");
        }
        project.setStatus(Status.DELETED);
        projectRepository.save(project);
    }
}
