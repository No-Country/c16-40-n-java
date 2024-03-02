package com.colaborapp.dto;

import lombok.Builder;

@Builder
public record UserResponseDTO(
        Long id,
        String name,
        String lastName,
        String email,
        String phoneNumber,
        UserProjectsDTO projects
) {
}
