package com.colaborapp.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record VolunteerRequestDTO(
        @NotEmpty String volunteerPhoneNumber,
        @NotNull Long projectId
) {
}
