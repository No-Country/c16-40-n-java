package com.colaborapp.model.mapper;

import com.colaborapp.dto.DonationResponseDTO;
import com.colaborapp.model.Donation;

public interface DonationMapper {
    DonationResponseDTO toDTO(Donation entity);
}
