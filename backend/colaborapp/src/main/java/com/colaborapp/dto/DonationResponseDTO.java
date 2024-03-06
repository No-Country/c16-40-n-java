package com.colaborapp.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record DonationResponseDTO(
        Long id,
        ProjectResponseDTO project,
        UserResponseDTO donor,
        Double amountDonated,
        LocalDateTime dateTime
) {
}
