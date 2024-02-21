package com.colaborapp.service.impl;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Category;
import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import com.colaborapp.model.User;
import com.colaborapp.model.mapper.ProjectMapper;
import com.colaborapp.repository.CategoryRepository;
import com.colaborapp.repository.ProjectRepository;
import com.colaborapp.repository.UserRepository;
import com.colaborapp.service.CategoryService;
import com.colaborapp.service.ProjectService;
import com.colaborapp.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProjectResponseDTO getProjectById(Long projectId) {
        return projectRepository.findById(projectId).map(projectMapper::toProjectResponseDto)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));

    }

    @Override
    public List<ProjectResponseDTO> getAllProjects() {
        return projectRepository.findAll().stream().map(projectMapper::toProjectResponseDto).collect(Collectors.toList());
    }

    @Override
    public ProjectResponseDTO updateProject(Long projectId, ProjectRequestDTO projectRequestDTO) {
        return projectRepository.findById(projectId)
                .map(project -> {
                    Project updatedProject = projectMapper.toProjectEntityForUpdate(project, projectRequestDTO);
                    projectRepository.save(updatedProject);
                    return projectMapper.toProjectResponseDto(updatedProject);
                })
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
    }

    @Override
    public void deleteProject(Long projectId) {
        projectRepository.findById(projectId)
                .map(project -> {
                    project.setStatus(Status.DELETED);
                    return projectRepository.save(project);
                })
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
    }

    @Override
    public ProjectResponseDTO createProject(String creatorEmail,ProjectRequestDTO projectRequestDTO) {
        User user = userRepository.findByEmail(creatorEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + projectRequestDTO.creator()));
        Category category = categoryRepository.findById(projectRequestDTO.category())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + projectRequestDTO.category()));
        Project newProject = projectMapper.toProjectEntity(projectRequestDTO);
        newProject.setCreator(user);
        newProject.setCategory(category);
        projectRepository.save(newProject);
        return projectMapper.toProjectResponseDto(newProject);
    }
}
