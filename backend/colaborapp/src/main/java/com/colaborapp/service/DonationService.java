package com.colaborapp.service;

import com.colaborapp.dto.DonationRequestDTO;
import com.colaborapp.dto.DonationResponseDTO;
import com.colaborapp.model.User;

import java.util.List;

public interface DonationService {
    DonationResponseDTO createDonation(User donor, Long projectId, DonationRequestDTO request);

    List<String> getProjectDonors(Long projectId);
}
