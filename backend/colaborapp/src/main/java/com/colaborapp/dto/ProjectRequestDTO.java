package com.colaborapp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    Double current_amount,
    LocalDate startDate,
    @NotNull(message = "End date is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yy")
    LocalDate endDate
) {
}