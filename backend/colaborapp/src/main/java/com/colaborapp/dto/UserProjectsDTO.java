package com.colaborapp.dto;

import lombok.Builder;

import java.util.Set;

@Builder
public record UserProjectsDTO(
        Set<ProjectInfoDTO> asOwner,
        Set<ProjectResponseDTO> asVolunteer
) {
}
