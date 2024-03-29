package com.colaborapp.dto;

import com.colaborapp.model.CategoryType;
import com.colaborapp.model.Status;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ProjectInfoDTO(
        Long id,
        CategoryType category,
        String title,
        Status status,
        String image,
        String description,
        Double goalAmount,
        Double currentAmount,
        LocalDate startDate,
        LocalDate endDate,
        AddressResponseDTO address
) {
}
