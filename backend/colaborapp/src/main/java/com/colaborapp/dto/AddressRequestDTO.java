package com.colaborapp.dto;

import jakarta.validation.constraints.NotBlank;

public record AddressRequestDTO(
        @NotBlank(message = "Province is required")
        String province,
        @NotBlank(message = "City is required")
        String city,
        int number,
        String street
) {
}
