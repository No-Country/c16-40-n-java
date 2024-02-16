package com.colaborapp.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public class ProjectResponseDTO {
    private Long id;
    private Long userId;
    private Long categoryId;
    private String title;
    private String status;
    private String image;
    private String description;
    private Double goalAmount;
    private Double currentAmount;
    private LocalDate startDate;
    private LocalDate endDate;
}
