package com.colaborapp.dto;

import com.colaborapp.model.Province;
import lombok.Builder;

@Builder
public record AddressResponseDTO(
        Long id,
        Province province,
        String city,
        int number,
        String street
) {
}
