package com.colaborapp.dto;

import lombok.Builder;

@Builder
public record Mail(
        String to,
        String subject,
        String content
) {
}
