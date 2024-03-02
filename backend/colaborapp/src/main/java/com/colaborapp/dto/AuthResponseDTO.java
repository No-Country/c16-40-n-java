package com.colaborapp.dto;

import lombok.Builder;

import java.util.Date;

@Builder
public record AuthResponseDTO(
        String email,
        String token,
        Date expirationDate
) {
}
