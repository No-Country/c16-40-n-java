package com.colaborapp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ProjectRequestDTO(
        @NotNull(message = "Category is required")
        String categoryType,
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
        @Min(value = 1000, message = "To start a project, the minimum goal amount is $1000")
        Double goalAmount,
        @NotNull(message = "End date is required")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
        LocalDate endDate,
        @NotNull(message = "Address details is required")
        @Valid
        AddressRequestDTO address
) {
}