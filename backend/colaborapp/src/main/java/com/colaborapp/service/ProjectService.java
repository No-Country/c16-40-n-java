package com.colaborapp.service;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Project;

import java.util.List;

public interface ProjectService {
    ProjectResponseDTO createProject(ProjectRequestDTO request);

    ProjectResponseDTO updateProject(Long id, ProjectRequestDTO updateRequest);

    void updateCurrentAmount(Project project, Double donation);

    ProjectResponseDTO fetchProjectData(Long id);

    List<ProjectResponseDTO> listProjectsByCategory(String category);

    Project getProjectEntityById(Long id);

    void deleteUserOwnedProject(Long id);

    void deleteUserProject(Long id);
}
