package com.colaborapp.service;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;

import java.util.List;
import java.util.Optional;

public interface ProjectService {
    Optional<ProjectResponseDTO> getProjectById(Long projectId);

    List<ProjectResponseDTO> getAllProjects();

    ProjectResponseDTO updateProject(Long projectId, ProjectRequestDTO projectRequestDTO);

    void deleteProject(Long projectId);

    ProjectResponseDTO createProject(String userId, ProjectRequestDTO projectRequestDTO);
}
