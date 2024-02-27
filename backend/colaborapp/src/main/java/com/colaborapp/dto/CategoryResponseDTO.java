package com.colaborapp.dto;

import com.colaborapp.model.CategoryType;
import lombok.Builder;

@Builder
public record CategoryResponseDTO(
        Long id,
        CategoryType type
) {
}
