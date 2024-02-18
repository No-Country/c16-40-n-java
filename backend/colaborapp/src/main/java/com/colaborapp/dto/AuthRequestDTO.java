package com.colaborapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

@Builder
public record AuthRequestDTO(
        @NotEmpty @NotBlank @Email String email,
        @NotEmpty @NotBlank String password
) {
}
