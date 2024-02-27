package com.colaborapp.model.mapper;

import com.colaborapp.dto.ProjectRequestDTO;
import com.colaborapp.dto.ProjectResponseDTO;
import com.colaborapp.model.Project;

public interface ProjectMapper {
    Project toEntity(ProjectRequestDTO dto);

    ProjectResponseDTO toDTO(Project entity);
}
