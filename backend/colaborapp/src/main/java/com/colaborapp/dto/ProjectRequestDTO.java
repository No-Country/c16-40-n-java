package com.colaborapp.dto;

import com.colaborapp.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ProjectRequestDTO (
    @NotEmpty(message = "Category is required")
    @NotBlank(message = "Category cannot be whitespaces")
    Long category,
    @NotEmpty(message = "Creator is required")
    @NotBlank(message = "Creator cannot be whitespaces")
    String creator,
    @NotEmpty(message = "Title is required")
    @NotBlank(message = "Title cannot be whitespaces")
    String title,
    String status,
    @NotEmpty(message = "Image URL is required")
    @NotBlank(message = "Image URL cannot be whitespaces")
    String image,
    @NotEmpty(message = "Description is required")
    @NotBlank(message = "Description cannot be whitespaces")
    String description,
    @NotNull(message = "Goal amount is required")
    @Positive(message = "Goal amount must be a positive number")
    Double goalAmount,
    Double current_amount,
    LocalDate startDate,
    @NotNull(message = "End date is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yy")
    LocalDate endDate
) {
}