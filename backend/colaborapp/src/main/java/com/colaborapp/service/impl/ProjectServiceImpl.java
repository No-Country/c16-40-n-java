package com.colaborapp.service.impl;

import com.colaborapp.dto.Mail;
import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.*;
import com.colaborapp.model.mapper.ProjectMapper;
import com.colaborapp.repository.ProjectRepository;
import com.colaborapp.service.*;
import com.colaborapp.utils.ApiUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@EnableAsync
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final AddressService addressService;
    private final ProjectMapper projectMapper;
    private final UserService userService;
    private final CategoryService categoryService;
    private final AuthService authService;
    private final MailService mailService;

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
            throw new RuntimeException("Trying to modify a not owned project."); // TODO: change me
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
        if (Objects.nonNull(updateRequest.address())) {
            addressService.updateAddress(projectToUpdate.getAddress(), updateRequest.address());
        }
        return projectMapper.toDTO(projectRepository.save(projectToUpdate));
    }

    @Override
    public void updateCurrentAmount(Project project, Double donation) {
        if (Objects.isNull(donation) || donation < 500) {
            throw new RuntimeException("Donation amount can't be less than $500 pesos."); // TODO: catch me
        }
        project.appendDonationToCurrentAmount(donation);
        projectRepository.save(project);
    }

    @Override
    public ProjectResponseDTO getProjectById(Long id) {
        return projectRepository.findByIdAndStatusAndEndDateAfter(id, Status.ACTIVE, LocalDate.now())
                .map(projectMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id)); // TODO: change me
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
            throw new RuntimeException("Required Project ID is null."); // TODO: change me
        }
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found for ID: %s".formatted(id))); // TODO: change me
    }

    @Override
    public void deleteUserOwnedProject(Long id) {
        Project project = getProjectEntityById(id);
        if (!project.getCreator().getEmail().equals(authService.getAuthenticatedUsername())) {
            throw new RuntimeException("Trying to modify a not owned project."); // TODO: change me
        }
        project.setStatus(Status.DELETED);
        projectRepository.save(project);
    }

    @Async
    @Override
    public void deleteUserProject(Long id) {
        Project project = getProjectEntityById(id);
        String projectTitle = project.getTitle();
        String subject = "Baja de Proyecto '%s'".formatted(projectTitle);
        String email = project.getCreator().getEmail();
        mailService.sendMail(Mail.builder()
                .to(email)
                .subject(subject)
                .content(ApiUtil.createContentPreDeletion(projectTitle))
                .build());
        project.setStatus(Status.PENDING);
        projectRepository.save(project);
        try {
            TimeUnit.DAYS.sleep(30);
        } catch (InterruptedException e) {
            log.error("An error occurred while waiting to delete a project: {}", e.getMessage());
        }
        project.setStatus(Status.DELETED);
        project = projectRepository.save(project);
        mailService.sendMail(Mail.builder()
                .to(project.getCreator().getEmail())
                .subject(subject)
                .content(ApiUtil.createContentPosDeletion(projectTitle))
                .build());
    }
}
