package com.colaborapp.service;

import com.colaborapp.dto.UserRequestDTO;
import com.colaborapp.dto.UserResponseDTO;
import com.colaborapp.dto.VolunteerRequestDTO;
import com.colaborapp.model.User;

public interface UserService {
    void userRegistration(UserRequestDTO registrationRequest);

    void beProjectVolunteer(VolunteerRequestDTO request);

    User getUserByEmailFromDatabase(String email);

    UserResponseDTO fetchUserDataWithRelatedProjects(Long id);
}
