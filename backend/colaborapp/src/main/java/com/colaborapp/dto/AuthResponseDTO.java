package com.colaborapp.dto;

import lombok.Builder;

@Builder
public record AuthResponseDTO(
        String email,
        String token
) {
}
