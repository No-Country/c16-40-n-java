package com.colaborapp.service.impl;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Project;
import com.colaborapp.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Override
    public ProjectResponseDTO getProjectById(Long projectId) {
        return null;
    }

    @Override
    public List<ProjectResponseDTO> getAllProjects() {
        return null;
    }

    @Override
    public ProjectResponseDTO updateProject(Long projectId, ProjectRequestDTO projectRequestDTO) {
        return null;
    }

    @Override
    public void deleteProject(Long projectId) {

    }
}
