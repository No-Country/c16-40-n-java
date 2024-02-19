package com.colaborapp.service.impl;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Project;
import com.colaborapp.model.Status;
import com.colaborapp.model.mapper.ProjectMapper;
import com.colaborapp.repository.ProjectRepository;
import com.colaborapp.service.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    @Override
    public Optional<ProjectResponseDTO> getProjectById(Long projectId) {
        Optional<Project> project = projectRepository.findById(projectId);
        return project.map(projectMapper::toProjectResponseDto);
    }

    @Override
    public List<ProjectResponseDTO> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        List<ProjectResponseDTO> foundProjects=  projects.stream()
                .map(projectMapper::toProjectResponseDto)
                .collect(Collectors.toList());

        if (!foundProjects.isEmpty()) {
            return foundProjects;
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public ProjectResponseDTO updateProject(Long projectId, ProjectRequestDTO projectRequestDTO) {
        Optional<Project> toUpdateProject = projectRepository.findById(projectId);
        if (toUpdateProject.isPresent()) {
            Project updatedProject = projectMapper.toProjectEntityForUpdate(toUpdateProject.get(), projectRequestDTO);
            Project savedProject = projectRepository.save(updatedProject);
            return projectMapper.toProjectResponseDto(savedProject);
        } else {
            throw new EntityNotFoundException("Project not found with id: " + projectId);
        }
    }

    @Override
    public void deleteProject(Long projectId) {
        Optional<Project> toDeleteProject = projectRepository.findById(projectId);

        if (toDeleteProject.isPresent()) {
            Project project = toDeleteProject.get();
            project.setStatus(Status.DELETED);
            projectRepository.save(project);
        } else {
            throw new EntityNotFoundException("Project not found with id: " + projectId);
        }
    }

    @Override
    public ProjectResponseDTO createProject(String userId, ProjectRequestDTO projectRequestDTO) {
        Project newProject = projectRepository.save(projectMapper.toProjectEntity(userId,projectRequestDTO));
        return projectMapper.toProjectResponseDto(newProject);
    }
}
