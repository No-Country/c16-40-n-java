package com.colaborapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record DonationRequestDTO(
        @NotNull @Min(value = 500) Double amount
) {
}
