package com.colaborapp.service;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Project;

import java.util.List;

public interface ProjectService {
    ProjectResponseDTO createProject(ProjectRequestDTO request);

    ProjectResponseDTO updateProject(Long id, ProjectRequestDTO updateRequest);

    ProjectResponseDTO getProjectById(Long id);

    List<ProjectResponseDTO> getAllProjects();

    List<ProjectResponseDTO> getAllActiveProjects();

    Project getProjectEntityById(Long id);

    void deleteProject(Long id);
}
