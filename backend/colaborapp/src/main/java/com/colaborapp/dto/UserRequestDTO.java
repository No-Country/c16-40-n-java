package com.colaborapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

@Builder
public record UserRequestDTO(
        @NotEmpty String name,
        @NotEmpty String lastName,
        @NotEmpty @Email String email,
        @NotEmpty String password,
        String phoneNumber
) {
}
