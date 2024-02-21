package com.colaborapp.service;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;

import java.util.List;

public interface ProjectService {
    ProjectResponseDTO getProjectById(Long projectId);

    List<ProjectResponseDTO> getAllProjects();

    ProjectResponseDTO updateProject(Long projectId, ProjectRequestDTO projectRequestDTO);

    void deleteProject(Long projectId);

    ProjectResponseDTO createProject(String creatorEmail, ProjectRequestDTO projectRequestDTO);
}
