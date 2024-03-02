package com.colaborapp.service;

import com.colaborapp.dto.AuthRequestDTO;
import com.colaborapp.dto.AuthResponseDTO;

public interface AuthService {
    AuthResponseDTO authentication(AuthRequestDTO request);

    String getAuthenticatedUsername();
}
