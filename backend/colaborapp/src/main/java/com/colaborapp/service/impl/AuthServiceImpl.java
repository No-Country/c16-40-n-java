package com.colaborapp.service.impl;

import com.colaborapp.auth.JwtService;
import com.colaborapp.dto.AuthRequestDTO;
import com.colaborapp.dto.AuthResponseDTO;
import com.colaborapp.service.AuthService;
import com.colaborapp.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final UserService userService;

    @Override
    public AuthResponseDTO authentication(AuthRequestDTO request) {
        var user = userService.getUserByEmailFromDatabase(request.email());
        // creates a user to authenticate
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        UserDetails userDetails = User.builder() // build a UserDetails (spring security class)
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(new SimpleGrantedAuthority(user.getRole().getType().getFullRoleName()))
                .build();
        return AuthResponseDTO.builder()
                .email(userDetails.getUsername())
                .token(jwtService.generateToken(userDetails))
                .build();
    }
    @Override
    public String getCurrentUserFromToken(String token) {
        String formattedToken  = extractToken(token);
        return jwtService.extractUsername(formattedToken);
    }
    private String extractToken(String token) {
        if (token != null) {
            return token.substring(7);
        }
        return null;
    }
}
