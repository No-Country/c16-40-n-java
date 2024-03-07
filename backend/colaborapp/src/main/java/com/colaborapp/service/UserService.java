package com.colaborapp.service;

import com.colaborapp.dto.*;
import com.colaborapp.model.User;

public interface UserService {
    void userRegistration(UserRequestDTO registrationRequest);

    void beProjectVolunteer(VolunteerRequestDTO request);

    DonationResponseDTO performDonation(Long projectId, DonationRequestDTO request);

    User getUserByEmailFromDatabase(String email);

    UserResponseDTO fetchUserDataWithRelatedProjects(Long id);
}
