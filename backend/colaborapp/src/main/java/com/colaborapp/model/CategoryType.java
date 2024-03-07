package com.colaborapp.model;

import java.util.Set;

public enum CategoryType {
    EDUCATION,
    HEALTH,
    ENVIRONMENT,
    COMMUNITY,
    HUMANITARIAN,
    HUMAN_RIGHTS,
    ART_CULTURE,
    ANIMAL,
    TECHNOLOGY,
    SOCIAL,
    OTHER;

    private static final Set<String> categories = Set.of(
            "EDUCATION",
            "HEALTH",
            "ENVIRONMENT",
            "COMMUNITY",
            "HUMANITARIAN",
            "HUMAN_RIGHTS",
            "ART_CULTURE",
            "ANIMAL",
            "TECHNOLOGY",
            "SOCIAL",
            "OTHER"
    );

    public static CategoryType getCategoryTypeFromString(String value) {
        String categoryType = value.toUpperCase();
        if (!categories.contains(categoryType)) {
            throw new IllegalArgumentException("Unknown Category Type: %s".formatted(value)); // TODO: catch me
        }
        return CategoryType.valueOf(categoryType);
    }
}
