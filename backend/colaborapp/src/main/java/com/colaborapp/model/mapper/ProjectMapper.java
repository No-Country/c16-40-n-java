package com.colaborapp.model.mapper;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Project;

public interface ProjectMapper {
    Project toProjectEntity(String userId, ProjectRequestDTO projectRequestDTO);

    ProjectResponseDTO toProjectResponseDto(Project entity);

    Project toProjectEntityForUpdate(Project existingProject, ProjectRequestDTO projectRequestDTO);
}
