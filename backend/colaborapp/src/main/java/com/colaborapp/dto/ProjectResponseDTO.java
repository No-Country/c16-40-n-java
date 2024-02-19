package com.colaborapp.dto;

import com.colaborapp.model.Category;
import com.colaborapp.model.User;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ProjectResponseDTO (
    Long id,
    Long userId,
    Long categoryId,
    String title,
    String status,
    String image,
    String description,
    Double goalAmount,
    Double currentAmount,
    LocalDate startDate,
    LocalDate endDate
) {}
