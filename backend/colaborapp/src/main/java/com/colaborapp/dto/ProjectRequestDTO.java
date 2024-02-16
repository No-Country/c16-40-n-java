package com.colaborapp.dto;

import jakarta.validation.constraints.*;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ProjectRequestDTO (
    @NotNull(message = "Category ID is required") Long categoryId,
    @NotBlank(message = "Title is mandatory") String title,
    String status,
    @NotBlank(message = "Image URL is mandatory") String image,
    @NotBlank(message = "Description is mandatory") String description,
    @NotNull(message = "Goal amount is required")
    @Positive(message = "Goal amount must be a positive number") Double goalAmount,
    @NotNull(message = "End date is required") LocalDate endDate
) {
}