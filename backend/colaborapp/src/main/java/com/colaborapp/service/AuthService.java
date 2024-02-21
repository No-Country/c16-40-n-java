package com.colaborapp.service;

import com.colaborapp.dto.AuthRequestDTO;
import com.colaborapp.dto.AuthResponseDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {
    AuthResponseDTO authentication(AuthRequestDTO request);

    String getCurrentUserFromToken(String token);
}
