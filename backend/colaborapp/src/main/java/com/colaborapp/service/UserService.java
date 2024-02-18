package com.colaborapp.service;

import com.colaborapp.dto.UserRequestDTO;
import com.colaborapp.model.User;

public interface UserService {
    void userRegistration(UserRequestDTO registrationRequest);

    User getUserByEmailFromDatabase(String email);
}
