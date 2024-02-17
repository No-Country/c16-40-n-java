package com.colaborapp.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ProjectResponseDTO (
    Long id,
    //private Long userId,
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
